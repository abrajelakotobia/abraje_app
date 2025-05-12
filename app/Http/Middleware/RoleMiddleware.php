<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Vérifie si l'utilisateur est authentifié ET si son rôle est dans la liste autorisée
        if (!Auth::check() || !in_array(Auth::user()->role, $roles)) {
            return response()->view('errors.unauthorized', [], 403);
        }

        return $next($request);
    }
}
