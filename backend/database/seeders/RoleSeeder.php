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
            ['name' => 'Master', 'description' => 'Master'],
            ['name' => 'Manager', 'description' => 'Manager'],
            ['name' => 'Staff', 'description' => 'Staff Member'],
        ]);
    }
}
