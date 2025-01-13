<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RolePermission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Gán quyền cho vai trò
        RolePermission::insert([
            ['role_id' => 1, 'permission_id' => 1], // Admin có quyền Manage Users
            ['role_id' => 1, 'permission_id' => 2], // Admin có quyền Create Blogs
            ['role_id' => 1, 'permission_id' => 3], // Admin có quyền Edit Blogs
            ['role_id' => 1, 'permission_id' => 4], // Admin có quyền Delete Blogs
            ['role_id' => 1, 'permission_id' => 5], // Admin có quyền View Reports
            ['role_id' => 2, 'permission_id' => 2], // Editor có quyền Create Blogs
            ['role_id' => 2, 'permission_id' => 3], // Editor có quyền Edit Blogs
        ]);
    }
}
