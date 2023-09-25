<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class behance extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'tags', 'url', 'cover', 'auther'];
}
