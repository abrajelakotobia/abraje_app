<?php
namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminChatController extends Controller
{

       public function index()
    {
        $messages = ChatMessage::where('user_id', Auth::id())->orderBy('created_at')->get();
        return Inertia::render('Chat', ['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // 1. Enregistrer le message de l'utilisateur
        ChatMessage::create([
            'user_id' => $user->id,
            'content' => $request->input('content'),
            'is_admin' => false,
        ]);

        // 2. Réponse automatique
        ChatMessage::create([
            'user_id' => $user->id,
            'content' => "Merci pour votre message ! Un administrateur vous répondra sous peu.",
            'is_admin' => true,
        ]);

        return back();
    }


}
