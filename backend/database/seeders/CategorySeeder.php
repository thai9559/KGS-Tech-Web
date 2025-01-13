<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo danh mục
        Category::insert([
            ['name' => 'Technology', 'slug' => 'technology', 'description' => 'All about technology'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'description' => 'Tips and tricks for daily life'],
            ['name' => 'Business', 'slug' => 'business', 'description' => 'Business news and trends'],
        ]);
    }
}
