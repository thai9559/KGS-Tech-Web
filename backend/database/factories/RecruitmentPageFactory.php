<?php

namespace Database\Factories;

use App\Models\RecruitmentPage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RecruitmentPageFactory extends Factory
{
    protected $model = RecruitmentPage::class;

    public function definition()
    {
        return [
            'fullname' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'position_apply' => $this->faker->jobTitle,
            'technology' => $this->faker->randomElement(['ReactJS', 'VueJS', 'PHP + Laravel', 'NodeJS - NestJS']), 
            'cv_path' => 'cvs/sample_cv.pdf', // Giả lập đường dẫn CV
        ];
    }
}
