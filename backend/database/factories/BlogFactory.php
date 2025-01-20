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
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'slug' => $this->faker->slug(),
            'main_keyword' => $this->faker->word(),
            'secondary_keywords' => implode(',', $this->faker->words(3)),
            'tags' => implode(',', $this->faker->words(5)),
            'meta_title' => $this->faker->sentence(),
            'meta_description' => $this->faker->text(150),
            'focus_keyword' => $this->faker->word(),
            'canonical_url' => $this->faker->url(),
            'category_id' => $this->faker->numberBetween(1, 10), // ID danh mục giả
            'user_id' => $this->faker->numberBetween(1, 5), // ID người dùng giả
            'images' => json_encode([$this->faker->imageUrl()]), // Danh sách ảnh giả
        ];
    }
}
