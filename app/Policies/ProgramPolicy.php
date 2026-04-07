<?php

namespace App\Policies;

use App\Models\Program;
use App\Models\User;

class ProgramPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, Program $program): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $program->organization
            && $user->faculty_id === $program->organization->faculty_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Program $program): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $program->organization
            && $user->faculty_id === $program->organization->faculty_id;
    }

    public function delete(User $user, Program $program): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $program->organization
            && $user->faculty_id === $program->organization->faculty_id;
    }
}
