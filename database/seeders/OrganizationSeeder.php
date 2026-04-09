<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Organization;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        // 🔥 BEM UNIVERSITAS (tanpa fakultas)
        Organization::firstOrCreate([
            'name' => 'BEM Universitas'
        ], [
            'type' => 'bem',
            'vision' => 'Menjadi organisasi mahasiswa tingkat universitas yang unggul.',
            'mission' => 'Mengayomi seluruh mahasiswa lintas fakultas.',
        ]);

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
                'bem' => 'BEM FKIP',
                'himas' => [
                    'HIMA PGSD',
                    'HIMA PBI',
                ],
            ],
            'fakultas-agama-islam' => [
                'bem' => 'BEM FAI',
                'himas' => [
                    'HIMA PIAUD',
                    'HIMA PGMI',
                ],
            ],
        ];

        foreach ($data as $facultySlug => $org) {
            $faculty = Faculty::where('slug', $facultySlug)->first();

            if (! $faculty) {
                continue; // skip kalau fakultas belum ada
            }

            // 🔥 BEM Fakultas
            $bem = Organization::firstOrCreate([
                'name' => $org['bem'],
                'faculty_id' => $faculty->id,
            ], [
                'type' => 'bem',
                'vision' => 'Menjadi organisasi mahasiswa yang progresif dan inspiratif.',
                'mission' => 'Mewadahi aspirasi dan pengembangan mahasiswa.',
            ]);

            // 🔥 HIMA
            foreach ($org['himas'] as $himaName) {
                Organization::firstOrCreate([
                    'name' => $himaName,
                    'faculty_id' => $faculty->id,
                ], [
                    'parent_id' => $bem->id,
                    'type' => 'hima',
                    'vision' => 'Meningkatkan kualitas mahasiswa program studi.',
                    'mission' => 'Mendukung akademik dan non-akademik mahasiswa.',
                ]);
            }
        }
    }
}