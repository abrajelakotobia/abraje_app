<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostsController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id(); // ID de l'utilisateur connecté

        $posts = Post::with('author')
                    ->where('user_id', $userId) // filtrer par user_id
                    ->latest()
                    ->paginate(6);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'canRegister' => Route::has('register'),
        ]);
    }




    public function create(): Response
    {
        if (!Auth::check()) {
            abort(403);
        }
        return Inertia::render('Posts/Create');
    }


    public function store(Request $request)
    {
        // Vérification de l'authentification
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Veuillez vous connecter pour créer un post.');
        }

        // Validation des données
        $validator = Validator::make($request->all(), [
            'city' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'product' => 'required|in:appartement,Maison,terrains,villas,magasins,bureaux,immeubles,hotels,restaurants,cafes,autres',
            'type' => 'required|in:vente,location,location vacances',
            'bedrooms' => 'required|integer|min:0',
            'bathrooms' => 'required|integer|min:0',
            'area' => 'required|numeric|min:0',
            'address' => 'required|string|max:255',
            'address_maps' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Gestion des erreurs de validation
        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', 'Veuillez corriger les erreurs dans le formulaire.');
        }

        try {
            // Création du post
            $post = new Post();
            $post->fill($validator->validated());
            $post->user_id = Auth::id();
            $post->save();

            // Gestion de l'image de couverture
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('posts', 'public');
                $post->update(['image' => $imagePath]);
            }

            // Gestion des images multiples
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    PostImage::create([
                        'post_id' => $post->id,
                        'image_path' => $image->store('posts', 'public'),
                    ]);
                }
            }

            // Redirection vers le dashboard avec message de succès
            return redirect()->route('dashboard')
                ->with('success', 'Votre annonce a été publiée avec succès!');

        } catch (\Exception $e) {
            // En cas d'erreur inattendue
            return back()
                ->withInput()
                ->with('error', 'Une erreur est survenue lors de la création de votre annonce: ' . $e->getMessage());
        }
    }
    public function toggleStatus(Request $request, Post $post)
    {
        $this->authorize('update', $post); // optionnel

        $post->is_active = $request->boolean('is_active');
        $post->save();

        return back()->with('success', 'Statut du post mis à jour.');
    }


    public function show(Post $post): Response
    {
        // Eager load the 'author' and 'images' relationships
        return Inertia::render('Posts/Show', [
            'post' => $post->load(['author', 'images'])
        ]);
    }


    public function edit(Post $post): Response
    {

        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'city' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'product' => 'required|in:appartement,Maison,terrains,villas,magasins,bureaux,immeubles,hotels,restaurants,cafes,autres',
            'type' => 'required|in:vente,location,location vacances',
            'bedrooms' => 'required|integer|min:0',
            'bathrooms' => 'required|integer|min:0',
            'area' => 'required|numeric|min:0',
            'address' => 'required|string|max:255',
            'address_maps' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update post details
        $post->update([
            'city' => $validated['city'],
            'sector' => $validated['sector'],
            'price' => $validated['price'],
            'product' => $validated['product'],
            'type' => $validated['type'],
            'bedrooms' => $validated['bedrooms'],
            'bathrooms' => $validated['bathrooms'],
            'area' => $validated['area'],
            'address' => $validated['address'],
            'address_maps' => $validated['address_maps'],
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image); // Delete old image
            }
            $path = $request->file('image')->store('posts', 'public');
            $post->image = $path;
            $post->save();
        }

        return redirect()->route('dashboard')->with('success', 'Post mis à jour avec succès!');
    }


    public function destroy(Post $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->back()->with('success', 'Post supprimé avec succès!');
    }


    public function like(Post $post)
    {
        $user = Auth::user();

        if ($post->likedBy()->where('user_id', $user->id)->exists()) {
            $post->likedBy()->detach($user->id);
            $message = 'Like retiré';
        } else {
            $post->likedBy()->attach($user->id);
            $message = 'Post liké';
        }

        return redirect()->back()->with('success', $message);
    }
}
