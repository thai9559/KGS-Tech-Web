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
            ['name' => 'manage_users', 'description' => 'Manage Users'],
            ['name' => 'create_blogs', 'description' => 'Create Blogs'],
            ['name' => 'edit_blogs', 'description' => 'Edit Blogs'],
            ['name' => 'delete_blogs', 'description' => 'Delete Blogs'],
            ['name' => 'view_reports', 'description' => 'View Reports'],
        ]);
    }
}
