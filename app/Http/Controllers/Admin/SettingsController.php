<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return view('admin.settings.index', [
            'site_name'        => config('app.name'),
            'site_description' => config('app.description'),
            'site_email'       => config('mail.from.address'),
            'site_phone'       => '',
            'site_address'     => '',
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'site_name'        => 'required|string|max:255',
            'site_description' => 'nullable|string',
            'site_email'       => 'nullable|email',
            'site_phone'       => 'nullable|string',
            'site_address'     => 'nullable|string',
        ]);

        // 🔴 sementara belum disimpan ke DB
        // nanti kita rapihin pake table settings

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}
