<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\LoginHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AdminLoginController extends Controller
{
    /**
     * Tampilkan form login admin
     */
    public function showLoginForm()
    {
        if (Auth::check() && in_array(Auth::user()->role->name, ['super_admin', 'faculty_admin'])) {
            return redirect()->route('admin.dashboard');
        }

        return view('admin.auth.login');
    }

    /**
     * Proses login admin
     */
    public function login(Request $request)
    {
        // ==========================
        // VALIDASI INPUT
        // ==========================
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'cf-turnstile-response' => ['required'],
        ]);

        // ==========================
        // VERIFIKASI CLOUDFLARE TURNSTILE
        // ==========================
        $response = Http::withOptions([
                'verify' => app()->environment('production'),
            ])
            ->asForm()
            ->post(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                [
                    'secret'   => config('services.turnstile.secret_key'),
                    'response' => $request->input('cf-turnstile-response'),
                    'remoteip' => $request->ip(),
                ]
            );

        if (!($response->json('success') ?? false)) {
            return back()->withErrors([
                'email' => 'Verifikasi keamanan gagal. Silakan coba lagi.',
            ])->onlyInput('email');
        }

        // ==========================
        // ATTEMPT LOGIN
        // ==========================
        $remember = $request->boolean('remember');

        if (!Auth::attempt($request->only('email', 'password'), $remember)) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');
        }

        $user = Auth::user();

        // ==========================
        // CEK ROLE ADMIN (FIX DISINI 🔥)
        // ==========================
        $allowedRoles = ['super_admin', 'faculty_admin'];

        if (!$user->role || !in_array($user->role->name, $allowedRoles)) {
            Auth::logout();

            return back()->withErrors([
                'email' => 'You do not have admin access.',
            ])->onlyInput('email');
        }

        // ==========================
        // UPDATE LAST LOGIN
        // ==========================
        $user->update([
            'last_login_at' => now(),
        ]);

        // ==========================
        // SIMPAN LOGIN HISTORY
        // ==========================
        LoginHistory::create([
            'user_id'      => $user->id,
            'ip_address'   => $request->ip(),
            'user_agent'   => $request->userAgent(),
            'logged_in_at' => now(),
        ]);

        // ==========================
        // SECURE SESSION
        // ==========================
        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * Logout admin
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}