<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Affiche la page d'accueil avec les annonces filtrées.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Post::query()
            ->with(['author', 'images']);

        // 🔍 Appliquer les filtres de recherche
        $this->applySearchFilters($query, $request);

        // ⏳ Récupérer les résultats avec pagination
        $posts = $query->latest()
            ->paginate(9)
            ->appends($request->query());

        // ⚙️ Renvoyer les données à la vue Inertia
        return Inertia::render('Index', [
            'posts' => $posts,
            'filters' => $request->only(['city', 'sector', 'type']),
            'searchParams' => $this->getSearchParams($request),
            'auth' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Applique les filtres de recherche à la requête.
     */
    protected function applySearchFilters($query, Request $request): void
    {
        // 📍 Filtre par ville (insensible à la casse)
        if ($request->filled('city')) {
            $query->where('city', 'ILIKE', '%' . $request->city . '%');
        }

        // 📍 Filtre par secteur (quartier)
        if ($request->filled('sector')) {
            $query->where('sector', 'ILIKE', '%' . $request->sector . '%');
        }

        // 🏠 Filtre par type de bien
        if ($request->filled('type')) {
            $query->whereIn('type', (array) $request->type);
        }

        // 💰 Filtre par prix minimum
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        // 💰 Filtre par prix maximum
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
    }

    /**
     * Prépare les paramètres de recherche à renvoyer à la vue.
     */
    protected function getSearchParams(Request $request): array
    {
        return [
            'city'      => $request->get('city'),
            'sector'    => $request->get('sector'),
            'type'      => $request->get('type', ''),
            'min_price' => $request->get('min_price'),
            'max_price' => $request->get('max_price'),
            'sort_by'   => $request->get('sort_by', 'newest'),
        ];
    }
}
