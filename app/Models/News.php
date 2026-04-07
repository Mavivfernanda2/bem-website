<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;
use App\Models\Faculty;
use App\Models\User;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'organization_id',
        'faculty_id',
        'author_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'external_link',
        'status',
        'publish_date',
    ];

    /**
     * Relasi ke organisasi (BEM / Ormawa)
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Relasi ke fakultas
     */
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * Relasi ke author (user)
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
