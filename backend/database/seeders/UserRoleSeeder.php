<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Gán vai trò cho người dùng
        DB::table('user_roles')->insert([
            ['user_id' => 1, 'role_id' => 1], // User ID 1 là admin
            ['user_id' => 2, 'role_id' => 2], // User ID 2 là editor
            ['user_id' => 3, 'role_id' => 3], // User ID 3 là staff
            ['user_id' => 4, 'role_id' => 3], // User ID 4 là staff
            ['user_id' => 5, 'role_id' => 3], // User ID 5 là staff
        ]);
    }
}
