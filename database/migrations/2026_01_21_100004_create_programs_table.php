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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();

            // Relasi ke organisasi (BEM Fakultas / HIMA)
            $table->foreignId('organization_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('image', 255)->nullable();

            $table->enum('status', ['draft', 'active', 'completed'])
                ->default('draft');

            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('organization_id');
            $table->index('status');
            $table->index(['organization_id', 'status']);

            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
