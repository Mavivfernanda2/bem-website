<?php

namespace App\Policies;

use App\Models\Faculty;
use App\Models\User;

class FacultyPolicy
{
    /**
     * Determine whether the user can view any faculties.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the faculty.
     */
    public function view(User $user, Faculty $faculty): bool
    {
        return $user->canAccessFaculty($faculty->id);
    }

    /**
     * Determine whether the user can create faculties.
     */
    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can update the faculty.
     */
    public function update(User $user, Faculty $faculty): bool
    {
        return $user->canAccessFaculty($faculty->id);
    }

    /**
     * Determine whether the user can delete the faculty.
     */
    public function delete(User $user, Faculty $faculty): bool
    {
        return $user->isSuperAdmin();
    }
}
