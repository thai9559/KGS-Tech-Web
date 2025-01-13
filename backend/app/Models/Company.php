<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'company'; // Khai báo tên bảng

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
        'social_links' => 'array',
    ];

    public function adminUser()
    {
        return $this->belongsTo(User::class, 'admin_user_id');
    }
}
