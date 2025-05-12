<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
        if(Auth::user()->utype != 'ADM')
      {
    session()->flush();
    return redirect()->route('login');
      }
    }
}
