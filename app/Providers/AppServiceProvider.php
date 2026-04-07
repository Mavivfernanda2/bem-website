<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Faculty;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Share Fakultas ke Navbar (BEM FakultAS)
         * Selalu ambil dari DATABASE (ANTI 404)
         */
        view()->composer('components.navbar', function ($view) {
            $view->with(
                'navFaculties',
                Faculty::orderBy('name')->get()
            );
        });
    }
}
