<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Contact extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email', // 👈 Add this line
        'mobile',   // and other fields like 'otp', 'expires_at', etc.
        'address',
    ];

     // Relation avec les posts
     function current_user() {
        return Auth::user();
    }

    // App\Models\Contact.php

public function author()
{
    return $this->belongsTo(User::class, 'user_id'); // 'user_id' = clé étrangère
}

}
