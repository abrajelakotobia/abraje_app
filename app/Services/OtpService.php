<?php

namespace App\Services;

use App\Models\Otp;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OtpService
{
    public function generateOtp($email)
    {
        // Supprime les anciens OTP
        Otp::where('email', $email)->delete();

        // Génère un nouveau OTP
        $otp = Str::random(6); // ou rand(100000, 999999) pour un code numérique

        // Stocke l'OTP
        Otp::create([
            'email' => $email,
            'otp' => $otp,
            'expires_at' => Carbon::now()->addMinutes(15)
        ]);

        return $otp;
    }

    public function verifyOtp($email, $otp)
    {
        $otpRecord = Otp::where('email', $email)
                        ->where('otp', $otp)
                        ->where('expires_at', '>', now())
                        ->first();

        if ($otpRecord) {
            $otpRecord->delete();
            return true;
        }

        return false;
    }
}
