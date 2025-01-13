<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo dữ liệu mẫu cho bảng company
        Company::create([
            'name' => 'ABC Corporation',
            'logo' => 'abc-logo.png',
            'description' => 'Leading technology company',
            'website' => 'https://abc.com',
            'email' => 'info@abc.com',
            'phone' => '0123456789',
            'address' => '123 ABC Street',
            'social_links' => json_encode([
                'facebook' => 'https://facebook.com/abc',
                'twitter' => 'https://twitter.com/abc',
                'linkedin' => 'https://linkedin.com/company/abc',
            ]),
        ]);
    }
}
