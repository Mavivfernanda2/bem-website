<?php

namespace App\Http\Controllers;

use App\Models\BemProfile;

class ProfilController extends Controller
{
    public function index()
    {
        $profil = BemProfile::first();

        // 🔥 FIX UTAMA: arahkan ke view yang benar
        return view('pages.profil', compact('profil'));
    }
}
