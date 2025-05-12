<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Tableau de bord principal Admin
     */
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'active_users' => User::where('is_active', true)->count(),
                // Ajoute d'autres statistiques selon ton besoin
            ]
        ]);
    }

    /**
     * Vue principale de l’espace admin
     */
    public function admin(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'title' => 'Admin Panel',
            'description' => 'Gestion des utilisateurs pour les admins',
        ]);
    }

    /**
     * Vue Super Admin
     */
    public function superadmin(): Response
    {
        return Inertia::render('SuperAdmin/System', [
            'title' => 'Super Admin Dashboard',
            'description' => 'Outils avancés pour superadmin',
        ]);
    }

    /**
     * Liste paginée des utilisateurs, avec recherche
     */
    public function users(Request $request): Response
    {
        $users = User::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Formulaire de création d’un utilisateur
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Enregistre un nouvel utilisateur
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'is_admin' => 'boolean'
        ]);

        User::create($validated);

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur créé avec succès');
    }

    /**
     * Affiche les détails d’un utilisateur
     */
    public function show(User $user): Response
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Formulaire de modification
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Met à jour les données de l’utilisateur
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'is_admin' => 'boolean'
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur mis à jour');
    }

    /**
     * Supprime un utilisateur
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur supprimé');
    }
}
