<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kiểm tra trước khi tạo người dùng
        User::firstOrCreate(
            ['email' => 'admin@example.com'], // Điều kiện tìm kiếm
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'), // Mật khẩu mặc định
            ]
        );
    }
}
