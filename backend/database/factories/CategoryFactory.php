<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word, // Tên danh mục ngẫu nhiên
            'slug' => $this->faker->slug, // Slug ngẫu nhiên
            'description' => $this->faker->sentence, // Mô tả ngẫu nhiên
        ];
    }
}
