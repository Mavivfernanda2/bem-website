<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'organization_id', // ✅ TAMBAHAN (WAJIB untuk HIMA)
        'title',
        'description',
        'link',          // ✅ FINAL FIX (LINK PROGRAM)
        'image',
        'status',
        'start_date',
        'end_date',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date'   => 'date',
        ];
    }

    /**
     * =========================
     * RELATIONSHIPS
     * =========================
     */

    /**
     * Relasi ke Fakultas
     */
    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * 🔥 Relasi ke Organisasi (BEM / HIMA)
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * =========================
     * SCOPES
     * =========================
     */

    /**
     * Scope filter by faculty
     */
    public function scopeForFaculty($query, $facultyId)
    {
        if ($facultyId) {
            return $query->where('faculty_id', $facultyId);
        }

        return $query;
    }

    /**
     * Scope hanya program aktif
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
