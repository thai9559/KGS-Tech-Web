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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id(); // ID bài viết
            $table->string('title'); // Tiêu đề bài viết
            $table->text('content'); // Nội dung bài viết
            $table->string('slug')->unique(); // URL thân thiện SEO
            $table->string('main_keyword'); // Từ khóa chính
            $table->string('secondary_keywords')->nullable(); // Từ khóa phụ (phân cách bằng dấu phẩy)
            $table->json('tags')->nullable(); // Cột tags
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Người dùng tạo bài viết
            $table->boolean('is_visible')->default(true); // Ẩn/Hiện bài viết
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
