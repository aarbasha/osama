<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['url' , 'post_id'];

    //protected $with = ['posts'];

    public function Post(){
        return $this->belongsTo(Post::class);
    }
}
