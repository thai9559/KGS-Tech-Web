<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator; 

class UserController extends Controller
{
    // Lấy danh sách người dùng
    public function index()
    {
        $users = User::with(['role', 'permissions'])->get()->map(function ($user) {
            $user->role = $user->role ?? null; // Đảm bảo role là một đối tượng hoặc null
            $user->permissions = $user->permissions ?? []; // Đảm bảo permissions là mảng
            return $user;
        });
        return response()->json([
            'success' => true,
            'data' => $users,
        ], 200);
    }
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');
            \Log::info('Login Credentials:', $credentials);
    
            $user = User::where('email', $credentials['email'])->first();
            if (!$user) {
                \Log::error('User Not Found');
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
    
            // So sánh hash mật khẩu
            \Log::info('Hashed Password from DB:', ['password' => $user->password]);
            if (!Hash::check($credentials['password'], $user->password)) {
                \Log::error('Password Mismatch');
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
    
            // Tạo token từ thông tin user
            $token = JWTAuth::fromUser($user);
            \Log::info('Generated Token:', ['token' => $token]);
    
            // Trả cả token và thông tin user trong response
            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'user' => $user, // Trả thông tin đầy đủ của user
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Login Error:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Server Error'], 500);
        }
    }
    
    
    


    // Đăng nhập
    // public function login(Request $request)
    // {
    //     try {
    //         // Validate dữ liệu từ frontend
    //         $request->validate([
    //             'email' => 'required|email',
    //             'password' => 'required|min:6',
    //         ]);

    //         // Lấy user bằng email
    //         $user = User::where('email', $request->email)->first();

    //         // Kiểm tra user và mật khẩu
    //         // if (!$user || !Hash::check($request->password, $user->password)) {
    //         //     return response()->json(['message' => 'Invalid credentials'], 401);
    //         // }

    //         // Tạo token
    //         $token = $user->createToken('auth_token')->plainTextToken;

    //         return response()->json([
    //             'message' => 'Login successful',
    //             'access_token' => $token,
    //             'token_type' => 'Bearer',
    //             'user' => $user,
    //         ], 200);
    //     } catch (\Exception $e) {
    //         \Log::error('Login Error', ['error' => $e->getMessage()]);
    //         return response()->json([
    //             'message' => 'An error occurred during login.',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }


    // Đăng xuất
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Logout successful'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to logout'], 500);
        }
    }
    

    // Đăng ký người dùng mới
//     public function register(Request $request)
// {
//     // Log toàn bộ payload từ frontend

//     $validatedData = $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|email|unique:users,email',
//         'phone' => 'nullable|string|max:15|regex:/^[0-9]{9,15}$/',
//         'role_id' => 'required|exists:roles,id',
//         'permissions' => 'nullable|array', // Chỉ cần là mảng
//         'permissions.*' => 'exists:permissions,id', // Đảm bảo các quyền tồn tại
//     ]);

//     // Tạo người dùng với thông tin cơ bản
//     $user = User::create([
//         'name' => $request->name,
//         'email' => $request->email,
//    'password' => Hash::make($request->password),

//         'phone' => $request->phone,
//         'role_id' => $request->role_id,
//     ]);

//     // Gán quyền nếu có
//     if ($request->has('permissions')) {
//         $user->permissions()->sync($request->permissions);
//     }

//     return response()->json([
//         'message' => 'User registered successfully',
//         'user' => $user,
//     ], 201);
// }



// public function register(Request $request)
// {
//     $validatedData = $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|email|unique:users,email',
//         'password' => 'required|string|min:6|confirmed', // Yêu cầu mật khẩu xác nhận
//     ]);

//     $user = User::create([
//         'name' => $validatedData['name'],
//         'email' => $validatedData['email'],
//         'password' => Hash::make($validatedData['password']), // Mã hóa mật khẩu
//     ]);

//     return response()->json([
//         'message' => 'User registered successfully',
//         'user' => $user,
//     ], 201);
// }

    
    

    // Xem chi tiết người dùng
    public function show($id)
    {
        $user = User::with(['role', 'permissions'])->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
        ], 200);
    }
    // public function register(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|unique:users,email',
    //         'phone' => 'nullable|string|max:15|regex:/^[0-9]{9,15}$/',
    //         'role_id' => 'required|exists:roles,id',
    //         'permissions' => 'nullable|array',
    //         'permissions.*' => 'exists:permissions,id',
    //     ]);
    
    //     // Tạo người dùng
    //     $user = User::create([
    //         'name' => $validatedData['name'],
    //         'email' => $validatedData['email'],
    //         'password' => Hash::make($request->password),
    //         'phone' => $validatedData['phone']?? null,
    //         'role_id' => $validatedData['role_id'],
    //     ]);
    
    //     // Gán quyền nếu có
    //     if ($request->has('permissions')) {
    //         $user->permissions()->sync($validatedData['permissions']);
    //     }
    
    //     // Lấy user_id từ token nếu tồn tại, nếu không để null
    //     $actorId = null;
    //     if ($request->header('Authorization')) {
    //         try {
    //             $actorId = auth()->id(); // Lấy ID từ token
    //         } catch (\Exception $e) {
    //             \Log::warning('Failed to parse token for register action: ' . $e->getMessage());
    //         }
    //     }
    
    //     // Ghi log
    //     ActivityLogController::log(
    //         $actorId, 
    //         'create',
    //         'users',
    //         $user->id,
    //         null,
    //         $user->toArray()
    //     );
    
    //     return response()->json([
    //         'message' => 'User registered successfully',
    //         'user' => $user,
    //     ], 201);
    // }
    public function register(Request $request)
{
    // Khởi tạo validator để kiểm tra dữ liệu
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'phone' => 'nullable|string|max:15|regex:/^[0-9]{9,15}$/',
        'role_id' => 'required|exists:roles,id',
        'permissions' => 'nullable|array',
        'permissions.*' => 'exists:permissions,id',
    ]);

    // Nếu có lỗi validate, kiểm tra email trùng với email đang đăng nhập
    if ($validator->fails()) {
        if (auth()->check() && auth()->user()->email === $request->email) {
            return response()->json([
                'status' => 'error',
                'duplicate_email' => true, // Biến báo trùng email
            ], 422);
        }

        // Các lỗi validate khác
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors(),
        ], 422);
    }

    // Lấy dữ liệu đã được xác thực
    $validatedData = $validator->validated();

    // Tạo người dùng mới
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($request->password),
        'phone' => $validatedData['phone'] ?? null,
        'role_id' => $validatedData['role_id'],
    ]);

    // Gán quyền nếu có
    if ($request->has('permissions')) {
        $user->permissions()->sync($validatedData['permissions']);
    }

    // Ghi log
    $actorId = auth()->check() ? auth()->id() : null;
    ActivityLogController::log(
        $actorId,
        'create',
        'users',
        $user->id,
        null,
        $user->toArray()
    );

    // Trả về phản hồi thành công
    return response()->json([
        'status' => 'success',
        'user' => $user,
    ], 201); // HTTP 201 Created
}

    
    // public function update(Request $request, $id)
    // {
    //     // Tìm người dùng
    //     $user = User::find($id);
    
    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], 404);
    //     }
    
    //     // Xác thực dữ liệu đầu vào
    //     $validatedData = $request->validate([
    //         'name' => 'nullable|string|max:255',
    //         'email' => 'nullable|email|unique:users,email,' . $id,
    //         'phone' => 'nullable|string|max:15|regex:/^[0-9]{9,15}$/',
    //         'is_active' => 'nullable|boolean',
    //         'password' => 'nullable|min:6|confirmed', // Xác thực mật khẩu nếu có
    //         'role_id' => 'nullable|exists:roles,id', // Đảm bảo role_id hợp lệ
    //         'permissions' => 'nullable|array', // Xác thực danh sách quyền
    //         'permissions.*' => 'exists:permissions,id', // Đảm bảo các quyền tồn tại
    //     ]);
    
    //     // Cập nhật thông tin người dùng nếu các trường có trong yêu cầu
    //     if ($request->has('name')) {
    //         $user->name = $validatedData['name'];
    //     }
    //     if ($request->has('email')) {
    //         $user->email = $validatedData['email'];
    //     }
    //     if ($request->has('phone')) {
    //         $user->phone = $validatedData['phone'];
    //     }
    //     if ($request->has('is_active')) {
    //         $user->is_active = $validatedData['is_active'];
    //     }
    
    //     // Cập nhật mật khẩu nếu được gửi
    //     if ($request->has('password')) {
    //         $user->password = Hash::make($validatedData['password']);
    //     }
    
    //     // Cập nhật vai trò nếu có
    //     if ($request->has('role_id')) {
    //         $user->role_id = $validatedData['role_id'];
    //     }
    
    //     // Lưu người dùng
    //     $user->save();
    
    //     // Cập nhật quyền
    //     if ($request->has('permissions')) {
    //         $user->permissions()->sync($validatedData['permissions']);
    //     }
    
    //     // Tải lại thông tin người dùng với quan hệ
    //     $updatedUser = $user->load('role', 'permissions');
    
    //     return response()->json([
    //         'message' => 'User updated successfully',
    //         'user' => $updatedUser,
    //     ], 200);
    // }
    public function update(Request $request, $id)
    {
        // Tìm người dùng
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Lưu dữ liệu cũ
        $oldData = $user->toArray();
    
        // Xác thực dữ liệu
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:15|regex:/^[0-9]{9,15}$/',
            'is_active' => 'nullable|boolean',
            'password' => 'nullable|min:6|confirmed',
            'role_id' => 'nullable|exists:roles,id',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);
    
        // Khởi tạo mảng thay đổi
        $changes = [];
        $newData = [];
    
        // Kiểm tra và cập nhật từng trường
        if ($request->has('name') && $validatedData['name'] !== $user->name) {
            $changes['name'] = $user->name;
            $newData['name'] = $validatedData['name'];
            $user->name = $validatedData['name'];
        }
        if ($request->has('email') && $validatedData['email'] !== $user->email) {
            $changes['email'] = $user->email;
            $newData['email'] = $validatedData['email'];
            $user->email = $validatedData['email'];
        }
        if ($request->has('phone') && $validatedData['phone'] !== $user->phone) {
            $changes['phone'] = $user->phone;
            $newData['phone'] = $validatedData['phone'];
            $user->phone = $validatedData['phone'];
        }
        if ($request->has('is_active') && (bool) $validatedData['is_active'] !== (bool) $user->is_active) {
            $changes['is_active'] = (bool) $user->is_active;
            $newData['is_active'] = (bool) $validatedData['is_active'];
            $user->is_active = $validatedData['is_active'];
        }
        if ($request->has('password')) {
            $changes['password'] = '********'; // Không lưu mật khẩu cũ
            $newData['password'] = '********'; // Chỉ báo mật khẩu đã thay đổi
            $user->password = Hash::make($validatedData['password']);
        }
        if ($request->has('role_id') && $validatedData['role_id'] !== $user->role_id) {
            $changes['role_id'] = $user->role_id;
            $newData['role_id'] = $validatedData['role_id'];
            $user->role_id = $validatedData['role_id'];
        }
    
        // Lưu thay đổi người dùng
        $user->save();
    
        // Cập nhật quyền
        if ($request->has('permissions')) {
            $oldPermissions = $user->permissions()->pluck('permissions.id')->toArray();
            $newPermissions = $validatedData['permissions'];
    
            if ($oldPermissions !== $newPermissions) {
                $changes['permissions'] = $oldPermissions;
                $newData['permissions'] = $newPermissions;
                $user->permissions()->sync($newPermissions);
            }
        }
    
        // Tải lại thông tin người dùng
        $updatedUser = $user->load('role', 'permissions');
    
        // Ghi log hoạt động
        $actorId = null;
        if ($request->header('Authorization')) {
            try {
                $actorId = auth()->id();
            } catch (\Exception $e) {
                \Log::warning('Failed to parse token for update action: ' . $e->getMessage());
            }
        }
    
        // Đồng nhất format trước khi log
        $changes = array_map(function ($value) {
            return is_bool($value) ? (bool) $value : $value;
        }, $changes);
    
        $newData = array_map(function ($value) {
            return is_bool($value) ? (bool) $value : $value;
        }, $newData);
    
        ActivityLogController::log(
            $actorId,
            'update',
            'users',
            $user->id,
            $changes,
            $newData
        );
    
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $updatedUser,
        ], 200);
    }
    

    // Xóa người dùng
    public function destroy($id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Lưu thông tin trước khi xóa
        $oldData = $user->toArray();
    
        // Ghi log trước khi xóa
        $actorId = null;
        if (request()->header('Authorization')) {
            try {
                $actorId = auth()->id();
            } catch (\Exception $e) {
                \Log::warning('Failed to parse token for delete action: ' . $e->getMessage());
            }
        }
    
        ActivityLogController::log(
            $actorId,
            'delete',
            'users',
            $user->id,
            $oldData,
            null
        );
    
        // Xóa người dùng
        $user->delete();
    
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
    
}
