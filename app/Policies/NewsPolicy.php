<?php

namespace App\Policies;

use App\Models\News;
use App\Models\User;

class NewsPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, News $news): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $news->organization
            && $user->faculty_id === $news->organization->faculty_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, News $news): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $news->organization
            && $user->faculty_id === $news->organization->faculty_id;
    }

    public function delete(User $user, News $news): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return $news->organization
            && $user->faculty_id === $news->organization->faculty_id;
    }
}
