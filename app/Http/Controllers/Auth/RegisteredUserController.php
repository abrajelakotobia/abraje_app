<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Notifications\SendOtpNotification;

class RegisteredUserController extends Controller
{
    protected $otpService;

    public function __construct(OtpService $otpService)
    {
        $this->otpService = $otpService;
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:users',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
           // Gestion de l'avatar
        $avatarPath = $request->hasFile('avatar')
        ? $request->file('avatar')->store('avatars', 'public')
        : null;
        // Créer l'utilisateur mais ne pas le connecter tout de suite
        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'email_verified_at' => null,
            'avatar' => $avatarPath,// Email non vérifié initialement
        ]);

        // Générer et envoyer l'OTP
        $otp = $this->otpService->generateOtp($user->email);
        $user->notify(new SendOtpNotification($otp));

        // Rediriger vers la page de vérification OTP
        return redirect()->route('verification.otp')->with([
            'email' => $user->email,
            'message' => 'Un code de vérification a été envoyé à votre adresse email.'
        ]);
    }

    /**
     * Afficher le formulaire de vérification OTP
     */
    public function showOtpVerificationForm(): Response
    {
        return Inertia::render('auth/otp-verifey', [
            'email' => session('email'),
            'message' => session('message'),
        ]);
    }
    /**
     * Vérifier l'OTP et compléter l'inscription
     */
    public function verifyOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string',
        ]);

        $isValid = $this->otpService->verifyOtp($request->email, $request->otp);

        if (!$isValid) {
            return back()->withErrors(['otp' => 'Code OTP invalide ou expiré']);
        }

        $user = User::where('email', $request->email)->first();
        $user->email_verified_at = now();
        $user->save();

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}

