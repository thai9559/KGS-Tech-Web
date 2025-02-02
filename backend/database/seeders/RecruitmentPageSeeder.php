<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RecruitmentPage;

class RecruitmentPageSeeder extends Seeder
{
    public function run()
    {
        // Tạo 10 ứng viên giả mạo bằng factory
        RecruitmentPage::factory(10)->create();
    }
}
