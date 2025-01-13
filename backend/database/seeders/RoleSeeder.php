<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo vai trò
        Role::insert([
            ['name' => 'admin', 'description' => 'Administrator'],
            ['name' => 'editor', 'description' => 'Content Editor'],
            ['name' => 'staff', 'description' => 'Staff Member'],
        ]);
    }
}
