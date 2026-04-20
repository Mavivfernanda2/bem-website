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
        Schema::create('members', function (Blueprint $table) {
            $table->id();

            // Nama anggota
            $table->string('name');

            // Level organisasi
            $table->enum('level', ['university', 'faculty', 'hima'])
                  ->default('university');

            // Relasi
            $table->foreignId('faculty_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();

            $table->foreignId('organization_id')
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();

            // Jabatan
            $table->string('position');

            // Foto
            $table->string('photo')->nullable();

            // Urutan tampil (biar struktur rapi)
            $table->integer('order')->default(0);

            // Status tampil
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};