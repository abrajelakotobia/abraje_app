<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Post::query()->with(['author', 'images']);

        // 🔒 Si l'utilisateur N'EST PAS superadmin, on filtre uniquement les posts actifs
      
        // 🔍 Application des filtres de recherche personnalisés
        $this->applySearchFilters($query, $request);

        // ⏳ Exécution de la requête avec pagination
        $posts = $query->latest()
                       ->paginate(9)
                       ->appends($request->query());

        return Inertia::render('Index', [
            'posts' => $posts,
            'filters' => $request->only('city', 'sector', 'type'),
            'searchParams' => $this->getSearchParams($request),
            'auth' => [
                'user' => $user
            ]
        ]);
    }



    /**
     * Applique les filtres de recherche à la requête
     */
    protected function applySearchFilters($query, Request $request)
    {
        // Filtre par ville (recherche insensible à la casse)
        if ($request->filled('city')) {
            $query->where('city', 'ilike', '%' . $request->city . '%');
        }

        // Filtre par secteur/quartier
        if ($request->filled('sector')) {
            $query->where('sector', 'ilike', '%' . $request->sector . '%');
        }

        // Filtre par type de bien
        if ($request->filled('type')) {
            $query->whereIn('type', (array)$request->type);
        }

        // Filtre optionnel par prix
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
    }

    /**
     * Prépare les paramètres de recherche pour la vue
     */
    protected function getSearchParams(Request $request)
    {
        return [
            'city' => $request->city,
            'sector' => $request->sector,
            'type' => $request->type ?? '',
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'sort_by' => $request->sort_by ?? 'newest'
        ];
    }
}
