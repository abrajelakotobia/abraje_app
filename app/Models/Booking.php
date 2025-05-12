<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
     'post_id',
    'user_id',
    'date',
    'entry_time',
    'datetime',
    ];

    // ✅ Relation vers l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ✅ Relation vers l'annonce (post)
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function author()
{
    return $this->belongsTo(User::class, 'user_id'); // 'user_id' = clé étrangère
}
}
