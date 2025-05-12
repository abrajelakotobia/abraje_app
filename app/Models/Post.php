<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;

    // Set fillable attributes for mass-assignment protection
    protected $fillable = [
        'city',
        'sector',
        'price',
        'product',
        'type',
        'bedrooms',
        'bathrooms',
        'area',
        'address',
        'address_maps',
        'status',
        'title',
        'description',
        'image',
        'user_id', // Assuming this is required for associating posts with users
    ];

    // Define appended attributes for dynamic calculation
    protected $appends = ['is_liked', 'likes_count'];

    // Define default relationships to be eager loaded
    protected $with = ['likedBy'];

    // Define a relationship to the user who authored the post
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Define a many-to-many relationship to users who liked the post
    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_likes');
    }

    // Calculate whether the current post is liked by the authenticated user
    public function getIsLikedAttribute(): bool
    {
        return Auth::check() && $this->likedBy->contains('id', Auth::id());
    }

    // Calculate the total count of likes for the post
    public function getLikesCountAttribute(): int
    {
        return $this->likedBy->count();
    }

    // Define the relationship to the images related to this post
    public function images()
    {
        return $this->hasMany(PostImage::class, 'post_id');
    }
    public function likes()
{
    return $this->belongsToMany(User::class, 'post_likes');
}


public function posts()
{
    return $this->hasMany(Post::class);
}

public function bookings()
{
    return $this->hasMany(Booking::class);  // Assuming you have a Booking model
}
public function user()
{
    return $this->belongsTo(User::class);
}

}
