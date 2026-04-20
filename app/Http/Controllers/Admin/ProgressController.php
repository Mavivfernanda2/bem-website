<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class ProgressController extends Controller
{
    public function index()
    {
        return view('admin.progress.index');
    }
}