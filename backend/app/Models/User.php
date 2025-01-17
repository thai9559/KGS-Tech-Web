<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // Import JWTSubject interface
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements JWTSubject // Implement JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role_id',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions', 'user_id', 'permission_id');
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'user_id');
    }

    public function company()
    {
        return $this->hasOne(Company::class, 'admin_user_id');
    }

    /**
     * Lấy identifier sẽ được lưu trong claim "sub" của JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Thường là id của user
    }

    /**
     * Thêm các claims tùy chỉnh vào JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role->name ?? null, // Lấy tên vai trò nếu có
            'is_active' => $this->is_active, // Trạng thái hoạt động
            'permissions' => $this->permissions->pluck('name')->toArray(),
        ];
    }
}
