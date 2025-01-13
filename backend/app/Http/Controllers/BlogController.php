<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            'category_id' => 'nullable|exists:categories,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Tự động tạo slug nếu không được cung cấp
        $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['title'], '-');

        $blog = Blog::create($validatedData);

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
        ]);

        $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['title'], '-');

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
