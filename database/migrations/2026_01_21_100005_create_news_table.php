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
        Schema::create('news', function (Blueprint $table) {
            $table->id();

            // Foreign key to faculties (nullable for global news)
            $table->foreignId('faculty_id')
                ->nullable()
                ->constrained('faculties')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            // Author relationship
            $table->foreignId('author_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->string('thumbnail', 255)->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('publish_date')->nullable();
            $table->timestamps();

            // Indexes for performance
            $table->index('faculty_id');
            $table->index('author_id');
            $table->index('status');
            $table->index('publish_date');
            $table->index(['faculty_id', 'status']);
            $table->index(['status', 'publish_date']);

            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
