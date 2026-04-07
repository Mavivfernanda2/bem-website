<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\News;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | SUPER ADMIN
        |--------------------------------------------------------------------------
        */
        if ($user->isSuperAdmin()) {

            // 🔢 Statistik
            $stats = [
                'faculties' => Faculty::count(),
                'programs'  => Program::count(),
                'news'      => News::count(),
                'users'     => User::count(),
            ];

            // 📰 Berita terbaru
            $recentNews = News::with(['organization', 'author'])
                ->latest()
                ->limit(5)
                ->get();

            // 📌 Program terbaru
            $recentPrograms = Program::with(['organization'])
                ->latest()
                ->limit(5)
                ->get();

            // 🟢 STATUS LOGIN (SEMUA ADMIN)
            $admins = User::whereHas('role', function ($q) {
                    $q->whereIn('name', ['super_admin', 'faculty_admin']);
                })
                ->with('faculty')
                ->orderByDesc('last_login_at')
                ->get();
        }

        /*
        |--------------------------------------------------------------------------
        | ADMIN FAKULTAS
        |--------------------------------------------------------------------------
        */
        else {

            $facultyId = $user->faculty_id;

            // 🔢 Statistik fakultas
            $stats = [
                'programs' => Program::whereHas('organization', function ($q) use ($facultyId) {
                    $q->where('faculty_id', $facultyId);
                })->count(),

                'news' => News::whereHas('organization', function ($q) use ($facultyId) {
                    $q->where('faculty_id', $facultyId);
                })->count(),
            ];

            // 📰 Berita terbaru fakultas
            $recentNews = News::with(['organization', 'author'])
                ->whereHas('organization', function ($q) use ($facultyId) {
                    $q->where('faculty_id', $facultyId);
                })
                ->latest()
                ->limit(5)
                ->get();

            // 📌 Program terbaru fakultas
            $recentPrograms = Program::with(['organization'])
                ->whereHas('organization', function ($q) use ($facultyId) {
                    $q->where('faculty_id', $facultyId);
                })
                ->latest()
                ->limit(5)
                ->get();

            // 🟢 STATUS LOGIN (HANYA FAKULTAS SENDIRI)
            $admins = User::where('faculty_id', $facultyId)
                ->with('faculty')
                ->orderByDesc('last_login_at')
                ->get();
        }

        return view('admin.dashboard', compact(
            'stats',
            'recentNews',
            'recentPrograms',
            'admins'
        ));
    }
}
