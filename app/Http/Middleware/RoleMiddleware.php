<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 🔒 Pastikan user login
        if (!auth()->check()) {
            return redirect('/admin/login');
        }

        $user = auth()->user();

        // ❌ Tidak punya role
        if (!$user->role) {
            abort(403, 'User tidak memiliki role');
        }

        // 🔥 Ambil nama role
        $roleName = $user->role->name;

        // 🔁 NORMALISASI ROLE (alias)
        $aliases = [
            'faculty_admin' => 'admin_fakultas',
        ];

        if (isset($aliases[$roleName])) {
            $roleName = $aliases[$roleName];
        }

        // 💣 SUPER ADMIN = FULL AKSES
        if ($roleName === 'super_admin') {
            return $next($request);
        }

        // 🔥 ADMIN UNIV = FULL AKSES (semua fitur admin)
        if ($roleName === 'admin_univ') {
            return $next($request);
        }

        // 🎯 ADMIN FAKULTAS = SESUAI ROUTE
        if ($roleName === 'admin_fakultas') {
            if (in_array('admin_fakultas', $roles)) {
                return $next($request);
            }
        }

        // ❌ Default: ditolak
        abort(403, 'Akses ditolak');
    }
}