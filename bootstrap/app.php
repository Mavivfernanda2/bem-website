<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\SuperAdminMiddleware;
use App\Http\Middleware\UpdateLastActivity;
use App\Http\Middleware\RoleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        /*
        |--------------------------------------------------------------------------
        | REGISTER MIDDLEWARE ALIAS
        |--------------------------------------------------------------------------
        */
        $middleware->alias([

            // 🔐 AUTH / ROLE
            'admin'           => AdminMiddleware::class,
            'super-admin'     => SuperAdminMiddleware::class,
            'role'            => RoleMiddleware::class,

            // ⏱️ ACTIVITY TRACKING
            'update.activity' => UpdateLastActivity::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();