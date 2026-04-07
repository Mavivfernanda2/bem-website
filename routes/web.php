<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\Auth\AdminLoginController;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FacultyController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\LoginMonitorController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// Homepage
Route::get('/', [PageController::class, 'beranda'])->name('beranda');

// Profil BEM Universitas
Route::get('/profil', [ProfilController::class, 'index'])->name('profil');

// Program Umum
Route::get('/program', [PageController::class, 'program'])->name('program');
Route::get('/program/{program}', [PageController::class, 'showProgram'])
    ->name('program.detail');

// Berita Umum
Route::get('/berita', [PageController::class, 'berita'])->name('berita');
Route::get('/berita/{slug}', [PageController::class, 'beritaDetail'])
    ->name('berita.detail');

// BEM Fakultas
Route::get('/bem-fakultas/{slug}', [PageController::class, 'fakultas'])
    ->name('fakultas.show');


/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {

    /*
    |=====================
    | GUEST (LOGIN ADMIN)
    |=====================
    */
    Route::middleware('guest')->group(function () {

        Route::get('login', [AdminLoginController::class, 'showLoginForm'])
            ->name('login');

        Route::post('login', [AdminLoginController::class, 'login']);
    });

    /*
    |=====================
    | AUTH ADMIN
    |=====================
    */
    Route::middleware(['auth', 'admin', 'update.activity'])->group(function () {

        // Logout
        Route::post('logout', [AdminLoginController::class, 'logout'])
            ->name('logout');

        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])
            ->name('dashboard');

        /*
        |=====================
        | FAKULTAS (READ ONLY)
        |=====================
        */
        Route::get('faculties', [FacultyController::class, 'index'])
            ->name('faculties.index');

        /*
        |=====================
        | PROGRAM
        |=====================
        */
        Route::resource('programs', ProgramController::class)
            ->except(['show']);

        /*
        |=====================
        | NEWS
        |=====================
        */
        Route::resource('news', NewsController::class)
            ->except(['show']);

        /*
        |=====================
        | SUPER ADMIN ONLY
        |=====================
        */
        Route::middleware('super-admin')->group(function () {

            // Faculties FULL CRUD
            Route::resource('faculties', FacultyController::class)
                ->except(['index', 'show']);

            // Users
            Route::resource('users', UserController::class)
                ->except(['show']);

            // Settings
            Route::get('settings', [SettingsController::class, 'index'])
                ->name('settings.index');

            Route::post('settings', [SettingsController::class, 'update'])
                ->name('settings.update');

            // 🔥 LOGIN MONITOR (SUPER ADMIN)
            Route::get('login-monitor', [LoginMonitorController::class, 'index'])
                ->name('login.monitor');
        });
    });
});
