<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;
use Illuminate\Support\Str;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $faculties = [
            [
                'name' => 'Fakultas Ilmu Komputer',
                'slug' => 'fakultas-ilmu-komputer',
                'description' => 'Fakultas Ilmu Komputer menaungi program studi di bidang teknologi dan informatika.',
            ],
            [
                'name' => 'Fakultas Ekonomi',
                'slug' => 'fakultas-ekonomi',
                'description' => 'Fakultas Ekonomi menaungi program studi di bidang manajemen dan akuntansi.',
            ],
            [
                'name' => 'Fakultas Teknik',
                'slug' => 'fakultas-teknik',
                'description' => 'Fakultas Teknik menaungi berbagai program studi di bidang teknik dan rekayasa.',
            ],
            [
                'name' => 'Fakultas Keguruan dan Ilmu Pendidikan',
                'slug' => 'fakultas-keguruan',
                'description' => 'Fakultas Keguruan dan Ilmu Pendidikan berfokus pada pendidikan dan pengajaran.',
            ],
            [
                'name' => 'Fakultas Agama Islam',
                'slug' => 'fakultas-agama-islam',
                'description' => 'Fakultas Agama Islam berfokus pada pendidikan keislaman.',
            ],
        ];

        foreach ($faculties as $faculty) {
            Faculty::firstOrCreate(
                ['slug' => $faculty['slug']], // key unik
                [
                    'name' => $faculty['name'],
                    'description' => $faculty['description'],
                ]
            );
        }
    }
}
