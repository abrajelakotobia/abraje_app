<?php

namespace App\Http\Controllers\SeperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use App\Models\User;
use Inertia\Inertia;

class ListAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function users()
    {
        $admins = User::where('is_admin', true)->paginate(10);
        return Inertia::render('Admin/AdminList', ['admins' => $admins]);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'phone' => ['required', 'string', 'max:20'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'avatar' => ['nullable', 'image', 'max:2048'],
    ]);

    if ($request->hasFile('avatar')) {
        $avatarPath = $request->file('avatar')->store('avatars', 'public');
    }

    User::create([
        'name' => $validated['name'],
        'phone' => $validated['phone'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'avatar' => $avatarPath ?? null,
        'role' => 'admin', // 👈 si tu veux que ce soit un admin
    ]);

    return redirect()->route('admin.index')->with('success', 'Admin ajouté avec succès.');
}
}
