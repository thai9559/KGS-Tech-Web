<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Log;

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
        'thumbnail_image' => 'nullable|string|max:255',
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


//     public function update(Request $request, $id)
// {
//     try {
//         // Lấy thông tin người dùng từ token
//         $actorId = null;
//         if ($request->header('Authorization')) {
//             try {
//                 $actorId = auth()->id(); // Lấy ID của user từ token
//             } catch (\Exception $e) {
//                 Log::warning('Failed to parse token for update action: ' . $e->getMessage());
//             }
//         }

//         // Kiểm tra nếu không xác thực được người dùng
//         if (!$actorId) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Unauthenticated user.',
//             ], 401);
//         }

//         // Log thông tin người dùng để debug
//         Log::info('User Info from JWT Token:', ['user_id' => $actorId]);

//         // Lấy bài viết theo ID
//         $blog = Blog::findOrFail($id);

//         // Validate dữ liệu đầu vào
//         $validatedData = $request->validate([
//             'title' => 'nullable|string|max:255',
//             'content' => 'nullable|string',
//             'slug' => 'nullable|string|unique:blogs,slug,' . $blog->id . '|max:255',
//             'main_keyword' => 'nullable|string|max:255',
//             'secondary_keywords' => 'nullable|string',
//             'tags' => 'nullable|array',
//             'tags.*' => 'string',
//             'meta_title' => 'nullable|string|max:255',
//             'meta_description' => 'nullable|string|max:255',
//             'focus_keyword' => 'nullable|string|max:255',
//             'canonical_url' => 'nullable|string|url|max:255',
//             'category_id' => 'nullable|exists:categories,id',
//             'images' => 'nullable|array',
//             'images.*' => 'string',
//             'thumbnail_image' => 'nullable|string|max:255',
//         ]);

//         // Lưu dữ liệu gốc để log
//         $originalData = $blog->toArray();

//         // Xử lý ảnh thumbnail nếu có
//         if ($request->hasFile('thumbnail_image')) {
//             $path = $request->file('thumbnail_image')->store('uploads/blog_thumbnails', 'public');
//             $validatedData['thumbnail_image'] = asset('storage/' . $path);
//         }

//         // Cập nhật thông tin blog
//         if (isset($validatedData['images'])) {
//             $validatedData['images'] = json_encode($validatedData['images']);
//         }
//         $blog->update($validatedData);

//         // Cập nhật tags nếu có
//         if (!empty($validatedData['tags'])) {
//             $blog->tags = json_encode($validatedData['tags']);
//             $blog->save();
//         }

//         // Ghi log hoạt động
//         ActivityLogController::log(
//             $actorId, // Sử dụng ID trực tiếp, không phải object
//             'update',
//             'blogs',
//             $blog->id,
//             $originalData,
//             $blog->toArray()
//         );

//         // Trả về kết quả
//         return response()->json([
//             'success' => true,
//             'message' => 'Blog updated successfully',
//             'data' => $blog,
//         ], 200);

//     } catch (\Throwable $e) {
//         // Log lỗi
//         Log::error('Error in Blog Update:', [
//             'error' => $e->getMessage(),
//             'stack' => $e->getTraceAsString()
//         ]);

//         return response()->json([
//             'success' => false,
//             'message' => 'Something went wrong',
//             'error' => $e->getMessage(),
//         ], 500);
//     }
// }

public function update(Request $request, $id)
{
    try {
        // Lấy thông tin người dùng từ token
        $actorId = null;
        if ($request->header('Authorization')) {
            try {
                $actorId = auth()->id(); // Lấy ID của user từ token
            } catch (\Exception $e) {
                Log::warning('Failed to parse token for update action: ' . $e->getMessage());
            }
        }

        // Kiểm tra nếu không xác thực được người dùng
        if (!$actorId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated user.',
            ], 401);
        }

        // Log thông tin người dùng để debug
        Log::info('User Info from JWT Token:', ['user_id' => $actorId]);

        // Lấy bài viết theo ID
        $blog = Blog::findOrFail($id);

        // Validate dữ liệu đầu vào
        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'slug' => 'nullable|string|unique:blogs,slug,' . $blog->id . '|max:255',
            'main_keyword' => 'nullable|string|max:255',
            'secondary_keywords' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'focus_keyword' => 'nullable|string|max:255',
            'canonical_url' => 'nullable|string|url|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'thumbnail_image' => 'nullable|string|max:255',
        ]);

        // Lưu dữ liệu gốc để so sánh
        $originalData = $blog->toArray();

        // Xử lý ảnh thumbnail nếu có
        if ($request->hasFile('thumbnail_image')) {
            $path = $request->file('thumbnail_image')->store('uploads/blog_thumbnails', 'public');
            $validatedData['thumbnail_image'] = asset('storage/' . $path);
        }

        // Cập nhật thông tin blog
        if (isset($validatedData['images'])) {
            $validatedData['images'] = json_encode($validatedData['images']);
        }
        $blog->update($validatedData);

        // Cập nhật tags nếu có
        if (!empty($validatedData['tags'])) {
            $blog->tags = json_encode($validatedData['tags']);
            $blog->save();
        }

        // Chỉ lưu lại phần thay đổi
        $oldData = array_filter($originalData, function ($value, $key) use ($blog) {
            // Lọc các trường có thay đổi
            return $blog->{$key} != $value;
        }, ARRAY_FILTER_USE_BOTH);

        $newData = array_filter($blog->toArray(), function ($value, $key) use ($originalData) {
            // Lọc các trường có thay đổi
            return $originalData[$key] != $value;
        }, ARRAY_FILTER_USE_BOTH);

        // Ghi log hoạt động
        ActivityLogController::log(
            $actorId, // Sử dụng ID trực tiếp, không phải object
            'update',
            'blogs',
            $blog->id,
            $oldData, // Dữ liệu cũ chỉ phần thay đổi
            $newData  // Dữ liệu mới chỉ phần thay đổi
        );

        // Trả về kết quả
        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog,
        ], 200);

    } catch (\Throwable $e) {
        // Log lỗi
        Log::error('Error in Blog Update:', [
            'error' => $e->getMessage(),
            'stack' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'error' => $e->getMessage(),
        ], 500);
    }
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
//     public function updateVisibility(Request $request, $id)
// {
    
//     // Tìm bài viết theo ID
//     $blog = Blog::find($id);

//     if (!$blog) {
//         return response()->json([
//             'success' => false,
//             'message' => 'Blog not found',
//         ], 404);
//     }

//     // Validate dữ liệu
//     $validatedData = $request->validate([
//         'is_visible' => 'required|boolean',
//     ]);

//     // Cập nhật trạng thái is_visible
//     $blog->is_visible = $validatedData['is_visible'];
//     $blog->save();

//     // Ghi log (nếu cần)
//     ActivityLogController::log(
//         auth()->id(), // Người dùng hiện tại
//         'update_visibility',
//         'blogs',
//         $blog->id,
//         null,
//         ['is_visible' => $blog->is_visible]
//     );

//     return response()->json([
//         'success' => true,
//         'message' => $blog->is_visible
//             ? 'Blog is now visible'
//             : 'Blog is now hidden',
//         'data' => $blog,
//     ], 200);
// }
// public function updateVisibility(Request $request, $id)
// {
//     try {
//         // Lấy user ID từ token
//         $userId = null;
//         if ($request->header('Authorization')) {
//             try {
//                 $userId = auth()->id(); // Lấy user ID từ token
//             } catch (\Exception $e) {
//                 \Log::warning('Failed to parse token for updateVisibility: ' . $e->getMessage());
//             }
//         }

//         // Kiểm tra nếu không lấy được user ID
//         if (!$userId) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Unauthenticated user.',
//             ], 401);
//         }

//         // Tìm bài viết theo ID
//         $blog = Blog::find($id);

//         if (!$blog) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Blog not found',
//             ], 404);
//         }

//         // Validate dữ liệu
//         $validatedData = $request->validate([
//             'is_visible' => 'required|boolean',
//         ]);

//         // Cập nhật trạng thái is_visible
//         $blog->is_visible = $validatedData['is_visible'];
//         $blog->save();

//         // Ghi log hoạt động
//         ActivityLogController::log(
//             $userId, // Người dùng hiện tại lấy từ token
//             'update_visibility',
//             'blogs',
//             $blog->id,
//             null,
//             ['is_visible' => $blog->is_visible]
//         );

//         return response()->json([
//             'success' => true,
//             'message' => $blog->is_visible
//                 ? 'Blog is now visible'
//                 : 'Blog is now hidden',
//             'data' => $blog,
//         ], 200);
//     } catch (\Throwable $e) {
//         // Log lỗi
//         \Log::error('Error in updateVisibility:', [
//             'error' => $e->getMessage(),
//             'stack' => $e->getTraceAsString()
//         ]);

//         return response()->json([
//             'success' => false,
//             'message' => 'Something went wrong',
//             'error' => $e->getMessage(),
//         ], 500);
//     }
// }
public function updateVisibility(Request $request, $id)
{
    try {
        // Lấy user ID từ token
        $userId = null;
        if ($request->header('Authorization')) {
            try {
                $userId = auth()->id(); // Lấy user ID từ token
            } catch (\Exception $e) {
                \Log::warning('Failed to parse token for updateVisibility: ' . $e->getMessage());
            }
        }

        // Kiểm tra nếu không lấy được user ID
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated user.',
            ], 401);
        }

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

        // Lưu giá trị cũ trước khi cập nhật
        $oldVisibility = ['is_visible' => $blog->is_visible];

        // Cập nhật trạng thái is_visible
        $blog->is_visible = $validatedData['is_visible'];
        $blog->save();

        // Ghi log hoạt động
        ActivityLogController::log(
            $userId, // Người dùng hiện tại lấy từ token
            'update_visibility',
            'blogs',
            $blog->id,
            $oldVisibility, // Truyền giá trị cũ vào đây
            ['is_visible' => $blog->is_visible] // Giá trị mới
        );

        return response()->json([
            'success' => true,
            'message' => $blog->is_visible
                ? 'Blog is now visible'
                : 'Blog is now hidden',
            'data' => $blog,
        ], 200);
    } catch (\Throwable $e) {
        // Log lỗi
        \Log::error('Error in updateVisibility:', [
            'error' => $e->getMessage(),
            'stack' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'error' => $e->getMessage(),
        ], 500);
    }
}




}
