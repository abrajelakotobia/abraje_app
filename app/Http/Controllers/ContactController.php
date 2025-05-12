<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;



class ContactController extends Controller
{


    public function index()
    {
        $userId = Auth::id(); // ID de l'utilisateur connecté

        $contacts = Contact::with('author')
                    ->where('user_id', $userId) // filtrer par user_id
                    ->latest()
                    ->paginate(6);

        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
            'canRegister' => Route::has('register'),
        ]);
    }
    public function create()
    {
        return inertia('contacts/create');
    }

    /**
     * Store a newly created resource in storage.
     */


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'mobile' => 'required|string|max:20|unique:contacts',
            'address' => 'nullable|string|max:255',
        ]);

        // ✅ Ajouter l'user_id de l'utilisateur connecté
        $validated['user_id'] = Auth::id();

        Contact::create($validated);

        return redirect()->route('contacts.index')->with('success', 'Contact ajouté avec succès.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        return inertia('contacts/edit', ['contact' => $contact]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:15',
            'address' => 'nullable|string|max:500',
        ]);

        $contact->update($validatedData);

        return redirect()->route('contacts.index')->with('success', 'Contact updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->route('contacts.index')->with('success', 'Contact deleted successfully');
    }
}
