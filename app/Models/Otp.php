<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    protected $fillable = [
        'email', // 👈 Add this line
        'otp',   // and other fields like 'otp', 'expires_at', etc.
    ];
}
