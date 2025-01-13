<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Lấy danh sách tất cả danh mục.
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ], 200);
    }

    /**
     * Tạo danh mục mới.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:categories,slug|max:255',
            'description' => 'nullable|string',
        ]);

        // Tự động tạo slug nếu không có trong request
        $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['name'], '-');

        $category = Category::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    /**
     * Lấy thông tin chi tiết của một danh mục.
     */
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $category,
        ], 200);
    }

    /**
     * Cập nhật danh mục.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:categories,slug,' . $id . '|max:255',
            'description' => 'nullable|string',
        ]);

        // Tự động tạo slug nếu không có trong request
        $validatedData['slug'] = $validatedData['slug'] ?? Str::slug($validatedData['name'], '-');

        $category->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ], 200);
    }

    /**
     * Xóa danh mục.
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ], 200);
    }
}
