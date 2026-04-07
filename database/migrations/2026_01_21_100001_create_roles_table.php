<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique(); // super_admin, faculty_admin
            $table->string('display_name', 100)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            // InnoDB is default in MySQL 8.x and Laravel
            $table->engine = 'InnoDB';
        });

        // Seed default roles
        DB::table('roles')->insert([
            ['name' => 'super_admin', 'display_name' => 'Super Admin', 'description' => 'Full system access', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'faculty_admin', 'display_name' => 'Faculty Admin', 'description' => 'Faculty-level access only', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
