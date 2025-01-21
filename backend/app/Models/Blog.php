<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'slug',
        'main_keyword',
        'secondary_keywords',
        'tags',
        'meta_title',
        'meta_description',
        'focus_keyword',
        'canonical_url',
        'category_id',
        'user_id',
        'images',
        'thumbnail_image', // Thêm trường thumbnail_image
        'is_visible',
    ];

    protected $casts = [
        'images' => 'array', // Chuyển đổi JSON sang mảng khi lấy dữ liệu
        'tags' => 'array',
        'is_visible' => 'boolean',
    ];

    /**
     * Quan hệ với Category.
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Quan hệ với User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'blog_tag'); // Quan hệ nhiều-nhiều
    }
}
