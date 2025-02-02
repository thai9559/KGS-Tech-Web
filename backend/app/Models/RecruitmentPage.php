<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitmentPage extends Model
{
    use HasFactory;

    protected $table = 'recruitment_table'; // 🔥 Đặt tên bảng thủ công

    protected $fillable = [
        'fullname',
        'email',
        'phone',
        'position_apply',
        'technology',
        'cv_path',
    ];
}

