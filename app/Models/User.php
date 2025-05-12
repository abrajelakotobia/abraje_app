<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Post;

class User extends Authenticatable
{
    use  HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'avatar',
        'utype',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }




    public function likedPosts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_likes');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin()
    {
        return $this->utype === 'ADM';
    }

    public function isUser()
    {
        return $this->utype === 'USR';
    }

    public function isEditor()
    {
        return $this->role === 'editor';
    }



    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    // Relation avec les posts
  

}
