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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // ID người dùng
            $table->string('name'); // Tên người dùng
            $table->string('email')->unique(); // Email (duy nhất)
            $table->timestamp('email_verified_at')->nullable(); // Thời gian xác minh email
            $table->string('password'); // Mật khẩu (hash)
            $table->boolean('is_active')->default(true); // Trạng thái hoạt động
            $table->string('phone', 15)->nullable(); // Số điện thoại
            $table->unsignedBigInteger('role_id')->nullable(); // Cột role_id
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null'); // Khóa ngoại
            $table->rememberToken(); // Token ghi nhớ (cho đăng nhập)
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
