<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo quyền
        Permission::insert([
            ['name' => 'Full administrative privileges', 'description' => 'Full administrative privileges'],
            ['name' => 'Users', 'description' => 'Users'],
            ['name' => 'Blogs', 'description' => 'Blogs'],
            ['name' => 'Feedback', 'description' => 'Feedback'],
            ['name' => 'Company', 'description' => 'Company'],
            ['name' => 'Recruiment', 'description' => 'Recruiment'],
        ]);
    }
}
