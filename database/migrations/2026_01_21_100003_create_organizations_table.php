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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();

            // relasi ke fakultas (BEM Fakultas / HIMA)
            $table->foreignId('faculty_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // parent untuk HIMA (parent = BEM Fakultas)
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('organizations')
                ->nullOnDelete();

            $table->string('name'); // nama BEM / HIMA
            $table->enum('type', ['bem', 'hima']); // jenis organisasi

            $table->text('vision')->nullable();
            $table->text('mission')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
