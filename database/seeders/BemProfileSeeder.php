<?php

use App\Models\BemProfile;

class BemProfileSeeder extends Seeder
{
    public function run(): void
    {
        BemProfile::create([
            'sejarah' => 'Badan Eksekutif Mahasiswa (BEM) merupakan organisasi kemahasiswaan tertinggi ...',
            'visi' => 'Terwujudnya Badan Eksekutif Mahasiswa yang aktif, inovatif, dan responsif.',
            'misi' => [
                'Menjadi wadah aspirasi mahasiswa',
                'Mengembangkan potensi mahasiswa',
                'Menjalin sinergi antar elemen kampus',
                'Mendorong budaya kritis dan berintegritas',
            ],
        ]);
    }
}

