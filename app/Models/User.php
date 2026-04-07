<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;

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
     * ROLE CHECKERS
     * ==========================
     */
    public function isSuperAdmin(): bool
    {
        return $this->role?->name === 'super_admin';
    }

    public function isFacultyAdmin(): bool
    {
        return $this->role?->name === 'faculty_admin';
    }

    public function isAdmin(): bool
    {
        return $this->isSuperAdmin() || $this->isFacultyAdmin();
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
     * ONLINE STATUS INDICATOR
     * ==========================
     * ONLINE = login <= 5 menit terakhir
     */
    public function isOnline(): bool
{
    if (!$this->last_login_at) {
        return false;
    }

    // dianggap online jika aktif <= 5 menit terakhir
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
