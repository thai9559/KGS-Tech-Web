<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\Category;
use App\Models\User;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy danh sách user IDs và category IDs
        $userIds = User::pluck('id')->toArray(); // Lấy danh sách user_id từ bảng users
        $categoryIds = Category::pluck('id')->toArray(); // Lấy danh sách category_id từ bảng categories

        // Tạo 10 bài viết mẫu
        Blog::factory()->count(10)->create([
            'user_id' => function () use ($userIds) {
                return $userIds[array_rand($userIds)]; // Random user_id
            },
            'category_id' => function () use ($categoryIds) {
                return $categoryIds[array_rand($categoryIds)]; // Random category_id
            },
        ]);
    }
}
