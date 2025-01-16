<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'company'; // Tên bảng

    protected $fillable = [
        'name',
        'logo',
        'description',
        'website',
        'email',
        'phone',
        'address',
        'social_links',
        'admin_user_id',
    ];

    protected $casts = [
        'social_links' => 'array', // Đảm bảo `social_links` luôn được trả về dưới dạng mảng
    ];

    public function adminUser()
    {
        return $this->belongsTo(User::class, 'admin_user_id');
    }
}
