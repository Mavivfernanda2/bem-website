<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Faculty;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * ROLE ID
         */
        $superAdminRoleId = DB::table('roles')
            ->where('name', 'super_admin')
            ->value('id');

        if (!$superAdminRoleId) {
            $this->command->error('Role super_admin tidak ditemukan!');
            return;
        }

        // 👉 ambil role admin fakultas (apa pun namanya, selain super_admin)
        $adminRoleId = DB::table('roles')
            ->where('name', '!=', 'super_admin')
            ->orderBy('id')
            ->value('id');

        if (!$adminRoleId) {
            $this->command->error('Role admin fakultas tidak ditemukan!');
            return;
        }

        /**
         * ==========================
         * SUPER ADMIN (AMAN)
         * ==========================
         */
        if (!User::where('email', 'superadmin@bem.ac.id')->exists()) {
            User::create([
                'name'       => 'Super Admin',
                'email'      => 'superadmin@bem.ac.id',
                'password'   => Hash::make('password123'),
                'role_id'    => $superAdminRoleId,
                'faculty_id'=> null,
            ]);

            $this->command->info('Super Admin dibuat.');
        } else {
            $this->command->info('Super Admin sudah ada, dilewati.');
        }

        /**
         * ==========================
         * ADMIN FAKULTAS
         * ==========================
         */
        $facultyAdmins = [
            ['email' => 'ft@bem.ac.id',     'name' => 'Admin Fakultas Teknik',        'slug' => 'fakultas-teknik'],
            ['email' => 'filkom@bem.ac.id', 'name' => 'Admin Fakultas Ilmu Komputer', 'slug' => 'fakultas-ilmu-komputer'],
            ['email' => 'fe@bem.ac.id',     'name' => 'Admin Fakultas Ekonomi',       'slug' => 'fakultas-ekonomi'],
            ['email' => 'fkip@bem.ac.id',   'name' => 'Admin Fakultas Keguruan',      'slug' => 'fakultas-keguruan'],
            ['email' => 'fai@bem.ac.id',    'name' => 'Admin Fakultas Agama Islam',   'slug' => 'fakultas-agama-islam'],
        ];

        foreach ($facultyAdmins as $admin) {

            $faculty = Faculty::where('slug', $admin['slug'])->first();

            if (!$faculty) {
                $this->command->warn("Fakultas {$admin['slug']} tidak ditemukan, dilewati.");
                continue;
            }

            if (User::where('email', $admin['email'])->exists()) {
                $this->command->info("User {$admin['email']} sudah ada, dilewati.");
                continue;
            }

            User::create([
                'name'       => $admin['name'],
                'email'      => $admin['email'],
                'password'   => Hash::make('admin123'),
                'role_id'    => $adminRoleId,
                'faculty_id' => $faculty->id,
            ]);

            $this->command->info("Admin {$admin['email']} dibuat.");
        }
    }
}
