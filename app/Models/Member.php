<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Member extends Model
{
    /**
     * =========================
     * TABLE
     * =========================
     */
    protected $table = 'members';

    /**
     * =========================
     * MASS ASSIGNABLE
     * =========================
     */
    protected $fillable = [
        'name',
        'level',
        'faculty_id',
        'organization_id',
        'position',
        'photo',
        'order',        // 🔥 WAJIB (untuk urutan)
        'is_active',    // 🔥 WAJIB (untuk tampil/tidak)
    ];

    /**
     * =========================
     * CASTS
     * =========================
     */
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * =========================
     * RELATIONSHIPS
     * =========================
     */

    // 🔥 KE ORGANIZATION (INI PALING PENTING)
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    // 🔥 KE FACULTY
    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * =========================
     * SCOPES (BIAR RAPI)
     * =========================
     */

    // 🔥 hanya yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    // 🔥 urutan jabatan otomatis
    public function scopeOrdered($query)
    {
        return $query->orderByRaw("
            CASE 
                WHEN position = 'Ketua' THEN 1
                WHEN position = 'Wakil Ketua' THEN 2
                WHEN position = 'Sekretaris' THEN 3
                WHEN position = 'Bendahara' THEN 4
                ELSE 5
            END
        ")->orderBy('order');
    }
}