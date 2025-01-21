<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'table_name',
        'record_id',
        'old_data',
        'new_data',
    ];

    /**
     * Liên kết với bảng `users`.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Giải mã dữ liệu JSON khi lấy ra.
     */
    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];
}
