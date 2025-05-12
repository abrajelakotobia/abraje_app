<?php

namespace App\Http\Controllers;

use App\Models\Messanger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessangerController extends Controller
{
    // Page Contact côté utilisateur
    public function index()
    {
        return Inertia::render('Contact');
    }

    // Enregistrement d'un message
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'mobile' => ['required', 'regex:/^0[6-7][0-9]{8}$/'], // Numéro FR
            'message' => 'required|string|max:1000',
        ]);

        Messanger::create($validated);

        return redirect()->back()->with('success', 'Message envoyé avec succès.');
    }

    // Vue Admin pour consulter les messages
 public function adminView()
{
    $contacts = Messanger::latest()->paginate(10);

    return Inertia::render('Admin/Contacts', [
        'contacts' => $contacts
    ]);
}
}

