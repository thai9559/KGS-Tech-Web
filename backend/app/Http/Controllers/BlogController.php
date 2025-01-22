<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\ActivityLogController;

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
        'tags' => 'nullable|array',
        'tags.*' => 'string',
        'meta_title' => 'nullable|string|max:255',
        'meta_description' => 'nullable|string|max:255',
        'focus_keyword' => 'nullable|string|max:255',
        'canonical_url' => 'nullable|string|url|max:255',
        'category_id' => 'nullable|exists:categories,id',
        'user_id' => 'required|exists:users,id', // Sử dụng user_id được gửi trong request
        'images' => 'nullable|array',
        'images.*' => 'string',
        'thumbnail_image' => 'required|string|max:255',
    ]);

    // Tự động tạo slug nếu không được cung cấp
    $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['title'], '-');
    $validatedData['images'] = json_encode($request->images ?? []);

    // Lưu ảnh đại diện
    if ($request->hasFile('thumbnail_image')) {
        $path = $request->file('thumbnail_image')->store('uploads/blog_thumbnails', 'public');
        $validatedData['thumbnail_image'] = asset('storage/' . $path);
    }

    // Tạo bài viết
    $blog = Blog::create($validatedData);

    // Xử lý tags (lưu dạng JSON)
    if (!empty($validatedData['tags'])) {
        $blog->tags = json_encode($validatedData['tags']);
        $blog->save();
    }

    // Ghi log bằng user_id từ dữ liệu đã gửi
    ActivityLogController::log(
        $validatedData['user_id'], // Lấy user_id từ dữ liệu đã được validate
        'create',
        'blogs',
        $blog->id,
        null,
        $blog->toArray()
    );

    return response()->json([
        'success' => true,
        'message' => 'Blog created successfully',
        'data' => $blog,
    ], 201);
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

    /**
     * Xử lý upload ảnh độc lập.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        $path = $request->file('image')->store('uploads/blog_images', 'public');

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'location' => asset('storage/' . $path),
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
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'focus_keyword' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|string|url|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'category_id' => 'nullable|exists:categories,id',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'thumbnail_image' => 'required|string|max:255',
        ]);

        $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['title'], '-');
        $validatedData['images'] = json_encode($request->images ?? []);

        // Lưu ảnh đại diện (logic từ code cũ)
        if ($request->hasFile('thumbnail_image')) {
            $path = $request->file('thumbnail_image')->store('uploads/blog_thumbnails', 'public');
            $validatedData['thumbnail_image'] = asset('storage/' . $path);
        }

        $blog->update($validatedData);

        // Xử lý tags (lưu dạng JSON)
        if (!empty($validatedData['tags'])) {
            $blog->tags = json_encode($validatedData['tags']);
            $blog->save();
        }
   

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

        // Ghi log
        ActivityLogController::log(
            $blog->user_id,
            'delete',
            'blogs',
            $blog->id,
            $blog->toArray(),
            null
        );

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully',
        ], 200);
    }
    public function updateVisibility(Request $request, $id)
{
    // Tìm bài viết theo ID
    $blog = Blog::find($id);

    if (!$blog) {
        return response()->json([
            'success' => false,
            'message' => 'Blog not found',
        ], 404);
    }

    // Validate dữ liệu
    $validatedData = $request->validate([
        'is_visible' => 'required|boolean',
    ]);

    // Cập nhật trạng thái is_visible
    $blog->is_visible = $validatedData['is_visible'];
    $blog->save();

    // Ghi log (nếu cần)
    ActivityLogController::log(
        auth()->id(), // Người dùng hiện tại
        'update_visibility',
        'blogs',
        $blog->id,
        null,
        ['is_visible' => $blog->is_visible]
    );

    return response()->json([
        'success' => true,
        'message' => $blog->is_visible
            ? 'Blog is now visible'
            : 'Blog is now hidden',
        'data' => $blog,
    ], 200);
}
}
