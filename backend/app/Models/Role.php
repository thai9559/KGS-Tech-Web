<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * Các cột được phép gán giá trị hàng loạt.
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Quan hệ một-nhiều với bảng users.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }
    

    /**
     * Quan hệ nhiều-nhiều với bảng permissions.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions', 'role_id', 'permission_id');
    }
}
