<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BemProfile extends Model
{
    protected $fillable = ['sejarah', 'visi', 'misi'];

    protected $casts = [
        'misi' => 'array',
    ];
}