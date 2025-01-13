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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id(); // ID log
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // Ai thực hiện
            $table->string('action'); // Hành động (create, update, delete)
            $table->string('table_name'); // Tên bảng bị thay đổi (e.g., company, blogs)
            $table->unsignedBigInteger('record_id'); // ID bản ghi bị thay đổi
            $table->json('old_data')->nullable(); // Dữ liệu cũ trước khi chỉnh sửa
            $table->json('new_data')->nullable(); // Dữ liệu mới sau khi chỉnh sửa
            $table->timestamps(); // Thời gian thực hiện
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
