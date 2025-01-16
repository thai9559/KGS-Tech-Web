<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FeedbackFactory extends Factory
{
    protected $model = \App\Models\Feedback::class;

    public function definition()
    {
        return [
            'email' => $this->faker->safeEmail,
            'subject' => $this->faker->sentence(3),
            'content' => $this->faker->paragraph,
            'sent_at' => now(),
            'is_visible' => $this->faker->boolean(80), // 80% sẽ hiển thị
        ];
    }
}
