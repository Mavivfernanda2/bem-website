<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {

            // LEVEL (WAJIB)
            if (!Schema::hasColumn('members', 'level')) {
                $table->enum('level', ['university', 'faculty', 'hima'])
                      ->default('university')
                      ->after('name');
            }

            // URUTAN TAMPIL (OPSIONAL)
            if (!Schema::hasColumn('members', 'order')) {
                $table->integer('order')
                      ->default(0)
                      ->after('position');
            }

            // STATUS AKTIF (OPSIONAL)
            if (!Schema::hasColumn('members', 'is_active')) {
                $table->boolean('is_active')
                      ->default(true)
                      ->after('photo');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {

            if (Schema::hasColumn('members', 'level')) {
                $table->dropColumn('level');
            }

            if (Schema::hasColumn('members', 'order')) {
                $table->dropColumn('order');
            }

            if (Schema::hasColumn('members', 'is_active')) {
                $table->dropColumn('is_active');
            }
        });
    }
};