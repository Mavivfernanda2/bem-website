<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * ==========================
     * MASS ASSIGNABLE
     * ==========================
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'faculty_id',
        'last_login_at',
    ];

    /**
     * ==========================
     * HIDDEN ATTRIBUTES
     * ==========================
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * ==========================
     * ATTRIBUTE CASTS
     * ==========================
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at'     => 'datetime',
            'password'          => 'hashed',
        ];
    }

    /**
     * ==========================
     * RELATIONSHIPS
     * ==========================
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * ==========================
     * NORMALIZE ROLE NAME (FIX TOTAL)
     * ==========================
     */
    private function getNormalizedRole(): ?string
    {
        if (!$this->role || !$this->role->name) {
            return null;
        }

        return strtolower(
            trim(
                preg_replace('/\s+/', '_', $this->role->name)
            )
        );
    }

    /**
     * ==========================
     * ROLE CHECKERS
     * ==========================
     */
    public function isSuperAdmin(): bool
    {
        return $this->getNormalizedRole() === 'super_admin';
    }

    public function isFacultyAdmin(): bool
    {
        return $this->getNormalizedRole() === 'admin_fakultas';
    }

    public function isAdmin(): bool
    {
        $role = $this->getNormalizedRole();

        return in_array($role, [
            'super_admin',
            'admin_univ',
            'admin_fakultas'
        ]);
    }

    /**
     * ==========================
     * FACULTY ACCESS
     * ==========================
     */
    public function canAccessFaculty(int $facultyId): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        return (int) $this->faculty_id === (int) $facultyId;
    }

    /**
     * ==========================
     * ONLINE STATUS
     * ==========================
     */
    public function isOnline(): bool
    {
        if (!$this->last_login_at) {
            return false;
        }

        return $this->last_login_at->greaterThan(now()->subMinutes(5));
    }

    public function lastActiveLabel(): string
    {
        if (!$this->last_login_at) {
            return 'belum pernah aktif';
        }

        return $this->last_login_at->diffForHumans();
    }
}