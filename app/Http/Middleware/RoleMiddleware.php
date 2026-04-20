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
        // 🔒 Pastikan user sudah login
        if (!auth()->check()) {
            return redirect()->route('admin.login')
                ->with('error', 'Silakan login terlebih dahulu');
        }

        $user = auth()->user();

        // ❌ Tidak punya relasi role
        if (!$user->role) {
            abort(403, 'User tidak memiliki role');
        }

        // 🔥 Ambil nama role dari database
        $roleName = $user->role->name;


        // 💣 SUPER ADMIN = FULL AKSES
        if ($roleName === 'super_admin') {
            return $next($request);
        }

        // 🎯 Cek apakah role user ada di parameter route
        if (in_array($roleName, $roles)) {
            return $next($request);
        }

        // ❌ Ditolak jika tidak sesuai
        return redirect()->route('admin.login')
            ->with('error', 'You do not have admin access.');
    }
}