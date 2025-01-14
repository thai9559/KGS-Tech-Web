<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Lấy danh sách người dùng
    public function index()
    {
        $users = User::all(); // Lấy toàn bộ người dùng
        return response()->json($users); // Trả về dưới dạng JSON
    }

    // Đăng nhập
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();

                // Tạo token cho người dùng
                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'message' => 'Login successful',
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user,
                ], 200);
            }

            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        } catch (\Exception $e) {
            \Log::error('Login Error', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'An error occurred during login.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Đăng xuất
    public function logout(Request $request)
    {
        try {
            // Xóa token hiện tại
            if ($request->user() && $request->user()->currentAccessToken()) {
                $request->user()->currentAccessToken()->delete();
            }

            return response()->json([
                'message' => 'Logout successful',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Logout Error', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'An error occurred during logout.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Đăng ký người dùng mới
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }

    // Xem chi tiết người dùng
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    // Cập nhật thông tin người dùng
    public function update(Request $request, $id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Xác thực các trường
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:15|regex:/^[0-9]{9,15}$/',
            'is_active' => 'required|boolean', // Đảm bảo nhận boolean cho trạng thái
            'password' => 'nullable|min:6|confirmed',
        ]);
    
        // Cập nhật các trường
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone ?? $user->phone;
        $user->is_active = $request->is_active;
    
        // Nếu có password, hash và cập nhật
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
    
        $user->save();
    
        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }
    

    // Xóa người dùng
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
