<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Quan hệ nhiều-nhiều với bảng roles.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    /**
     * Quan hệ nhiều-nhiều với bảng permissions.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions', 'user_id', 'permission_id');
    }

    /**
     * Quan hệ một-nhiều với bảng blogs.
     */
    public function blogs()
    {
        return $this->hasMany(Blog::class, 'user_id');
    }

    /**
     * Quan hệ một-một với bảng company.
     */
    public function company()
    {
        return $this->hasOne(Company::class, 'admin_user_id');
    }
}
