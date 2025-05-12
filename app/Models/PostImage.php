<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    protected $fillable = [
        'post_id',
        'image_path'
    ];

    // Define the inverse relationship (belongs to Post)
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
