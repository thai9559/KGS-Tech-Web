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
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // ID danh mục
            $table->string('name'); // Tên danh mục
            $table->string('slug')->unique(); // Slug của danh mục (thân thiện SEO)
            $table->text('description')->nullable(); // Mô tả danh mục
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
