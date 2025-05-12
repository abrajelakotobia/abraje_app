<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Message;
use App\Events\UserTyping;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat', [
            'messages' => Message::orderBy('created_at')->get(),
            'authUser' => Auth::user(), // 👈 Passe l'utilisateur connecté à Inertia
        ]);
    }

      public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500'
        ]);

        $message = $request->user()->messages()->create([
            'content' => $validated['content'],
            'is_admin' => $request->user()->is_admin ?? false
        ]);

        return back()->with('success', 'Message sent!');
    }

    public function typing(Request $request)
    {
        $request->validate(['is_typing' => 'required|boolean']);

        broadcast(new UserTyping(
            $request->user(),
            $request->is_typing
        ))->toOthers();

        return response()->json(['status' => 'success']);
    }
}
