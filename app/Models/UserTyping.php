<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class UserTyping implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $user;
    public $is_typing;

    public function __construct(User $user, bool $is_typing)
    {
        $this->user = $user;
        $this->is_typing = $is_typing;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }
}
