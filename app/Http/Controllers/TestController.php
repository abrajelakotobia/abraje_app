<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class TestController extends Controller
{
    /**
     * Vue pour les administrateurs.
     */


     public function dashboard()
     {
         $userId = Auth::id(); // ID de l'utilisateur connecté

         $posts = Post::with('author')
                     ->where('user_id', $userId) // filtrer par user_id
                     ->latest()
                     ->paginate(6);

         return Inertia::render('dashboard', [
            'posts' => Post::paginate(10),

             'canRegister' => Route::has('register'),
         ]);
     }

    public function admin(): Response
    {
        return Inertia::render('Admin/Users');
    }

    /**
     * Vue pour les super-administrateurs.
     */
    public function superadmin(): Response
    {
        return Inertia::render('SuperAdmin/System');
    }
}
