<?php

namespace Database\Factories;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogFactory extends Factory
{
    protected $model = Blog::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence, // Tiêu đề ngẫu nhiên
            'content' => $this->faker->paragraphs(3, true), // Nội dung ngẫu nhiên
            'slug' => $this->faker->slug, // Slug ngẫu nhiên
            'main_keyword' => $this->faker->word, // Từ khóa chính
            'secondary_keywords' => implode(', ', $this->faker->words(3)), // Từ khóa phụ (danh sách)
            'tags' => implode(', ', $this->faker->words(5)), // Tags
        ];
    }
}
