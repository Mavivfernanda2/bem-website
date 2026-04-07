<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'parent_id',
        'name',
        'type',
        'vision',
        'mission',
    ];

    /**
     * Relasi ke Fakultas
     */
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * Ketua & Wakil
     */
    public function leaders()
    {
        return $this->hasMany(OrganizationLeader::class);
    }

    /**
     * Program kerja organisasi
     */
    public function programs()
    {
        return $this->hasMany(Program::class);
    }

    /**
     * Berita organisasi
     */
    public function news()
    {
        return $this->hasMany(News::class);
    }

    /**
     * HIMA di bawah BEM Fakultas
     */
    public function himas()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * Parent organization (BEM Fakultas)
     */
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }
}
