<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil roles
        $superAdminRole = Role::where('name', 'super_admin')->first();
        $facultyAdminRole = Role::where('name', 'faculty_admin')->first();

        if (!$superAdminRole || !$facultyAdminRole) {
            throw new \Exception('Roles not found. Run RoleSeeder first.');
        }

        // === Create Super Admin ===
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@bem.ac.id',
            'password' => Hash::make('password'),
            'role_id' => $superAdminRole->id,
            'faculty_id' => null,
        ]);

        // === Create Faculty Admins ===
        $faculties = Faculty::all();

        foreach ($faculties as $faculty) {
            User::create([
                'name' => 'Admin ' . $faculty->name,
                'email' => 'admin.' . $faculty->slug . '@bem.ac.id',
                'password' => Hash::make('password'),
                'role_id' => $facultyAdminRole->id,
                'faculty_id' => $faculty->id,
            ]);
        }
    }
}
