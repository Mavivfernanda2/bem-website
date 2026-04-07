<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Organization;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * Struktur Fakultas + BEM + HIMA
         */
        $data = [
            'fakultas-ilmu-komputer' => [
                'bem' => 'BEM Fakultas Ilmu Komputer',
                'himas' => [
                    'HIMA Informatika',
                    'HIMA DKV',
                    'HIMA Sistem Informasi',
                ],
            ],
            'fakultas-ekonomi' => [
                'bem' => 'BEM Fakultas Ekonomi',
                'himas' => [
                    'HIMA Manajemen',
                    'HIMA Akuntansi',
                ],
            ],
            'fakultas-teknik' => [
                'bem' => 'BEM Fakultas Teknik',
                'himas' => [
                    'HIMA Teknik Industri',
                    'HIMA Teknik Kimia',
                    'HIMA Teknik Lingkungan',
                ],
            ],
            'fakultas-keguruan' => [
                'bem' => 'BEM Fakultas Keguruan dan Ilmu Pendidikan',
                'himas' => [
                    'HIMA PGSD',
                    'HIMA PBI',
                ],
            ],
            'fakultas-agama-islam' => [
                'bem' => 'BEM Fakultas Agama Islam',
                'himas' => [
                    'HIMA PIAUD',
                    'HIMA PGMI',
                ],
            ],
        ];

        foreach ($data as $facultySlug => $org) {
            $faculty = Faculty::where('slug', $facultySlug)->first();

            if (! $faculty) {
                continue;
            }

            // BEM Fakultas
            $bem = Organization::create([
                'faculty_id' => $faculty->id,
                'name'       => $org['bem'],
                'type'       => 'bem',
                'vision'     => 'Menjadi organisasi mahasiswa yang progresif dan inspiratif.',
                'mission'    => 'Mewadahi aspirasi dan pengembangan mahasiswa.',
            ]);

            // HIMA
            foreach ($org['himas'] as $himaName) {
                Organization::create([
                    'faculty_id' => $faculty->id,
                    'parent_id'  => $bem->id,
                    'name'       => $himaName,
                    'type'       => 'hima',
                    'vision'     => 'Meningkatkan kualitas mahasiswa program studi.',
                    'mission'    => 'Mendukung akademik dan non-akademik mahasiswa.',
                ]);
            }
        }
    }
}
