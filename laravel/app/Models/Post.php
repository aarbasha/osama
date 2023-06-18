<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categorie;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body', 'cover', 'images', 'tags', 'auther'];

    protected $with =['Categorie'];

    public function Categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function Image()
    {
        return $this->hasMany(Post::class, 'post_id');
    }
}
