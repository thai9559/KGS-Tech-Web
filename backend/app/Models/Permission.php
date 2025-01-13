<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Quan hệ nhiều-nhiều với bảng roles.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions', 'permission_id', 'role_id');
    }

    /**
     * Quan hệ nhiều-nhiều với bảng users.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_permissions', 'permission_id', 'user_id');
    }
}
