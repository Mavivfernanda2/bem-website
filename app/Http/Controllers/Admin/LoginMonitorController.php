<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class LoginMonitorController extends Controller
{
    public function index()
    {
        $users = User::with('faculty')
            ->orderBy('last_login_at', 'desc')
            ->get();

        return view('admin.monitor.login', compact('users'));
    }
}
