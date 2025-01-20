<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Lấy danh sách tất cả bài viết.
     */
    public function index()
    {
        $blogs = Blog::with(['category', 'user'])->get();

        return response()->json([
            'success' => true,
            'data' => $blogs,
        ], 200);
    }

    /**
     * Tạo bài viết mới.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|unique:blogs,slug|max:255',
            'main_keyword' => 'required|string|max:255',
            'secondary_keywords' => 'nullable|string',
            'tags' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255', // Tiêu đề SEO
            'meta_description' => 'nullable|string|max:255', // Mô tả SEO
            'focus_keyword' => 'nullable|string|max:255', // Từ khóa chính cho SEO
            'canonical_url' => 'nullable|string|url|max:255', // URL chuẩn hóa
            'category_id' => 'nullable|exists:categories,id',
            'user_id' => 'required|exists:users,id',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'thumbnail_image' => 'required|string|max:255',
        ]);
    
        // Tự động tạo slug nếu không được cung cấp
        $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['title'], '-');
        $validatedData['images'] = json_encode($request->images ?? []);
        if ($request->hasFile('thumbnail_image')) {
            $path = $request->file('thumbnail_image')->store('uploads/blog_thumbnails', 'public');
            $validatedData['thumbnail_image'] = asset('storage/' . $path);
        }
        
        // Tạo bài viết
        $blog = Blog::create($validatedData);
    
        return response()->json([
            'success' => true,
            'message' => 'Blog created successfully',
            'data' => $blog,
        ], 201); // Trả về JSON với status 201
    }
    
    

    /**
     * Lấy thông tin chi tiết một bài viết.
     */
    public function show($id)
    {
        $blog = Blog::with(['category', 'user'])->find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $blog,
        ], 200);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);
    
        // Lưu file ảnh
        $path = $request->file('image')->store('uploads/blog_images', 'public');
    
        // Trả về JSON với URL đầy đủ
        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'location' => asset('storage/' . $path), // asset() sẽ trả về URL đầy đủ
        ]);
    }
    



    
    /**
     * Cập nhật bài viết.
     */
    public function update(Request $request, $id)
{
    $blog = Blog::find($id);

    if (!$blog) {
        return response()->json([
            'success' => false,
            'message' => 'Blog not found',
        ], 404);
    }

    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'slug' => 'nullable|string|unique:blogs,slug,' . $id . '|max:255',
        'main_keyword' => 'required|string|max:255',
        'secondary_keywords' => 'nullable|string',
        'tags' => 'nullable|string',
        'category_id' => 'nullable|exists:categories,id',
        'images' => 'nullable|array',
        'images.*' => 'string',
        'thumbnail_image' => 'required|string|max:255',
    ]);
    if ($request->hasFile('thumbnail_image')) {
        $path = $request->file('thumbnail_image')->store('uploads/blog_thumbnails', 'public');
        $validatedData['thumbnail_image'] = asset('storage/' . $path);
    }
    
    $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['title'], '-');
    $validatedData['images'] = json_encode($request->images ?? []);

    $blog->update($validatedData);

    return response()->json([
        'success' => true,
        'message' => 'Blog updated successfully',
        'data' => $blog,
    ], 200);
}


    /**
     * Xóa bài viết.
     */
    public function destroy($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully',
        ], 200);
    }
}
