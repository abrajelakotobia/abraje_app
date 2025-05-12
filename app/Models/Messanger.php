<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Messanger extends Model
{
    protected $fillable = [
        'name',
        'email', // 👈 Add this line
        'mobile',
        'message',  // and other fields like 'otp', 'expires_at', etc.

    ];
}
