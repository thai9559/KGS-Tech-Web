<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * API Đăng nhập.
     */
    public function index()
    {
        $users = User::all(); // Lấy toàn bộ người dùng
        return response()->json($users); // Trả về dưới dạng JSON
    }
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
    
    
    
    
    /**
     * API Đăng xuất.
     */
    public function logout(Request $request)
    {
        try {
            // Kiểm tra nếu người dùng có token hiện tại
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
    
    
    

    /**
     * API Đăng ký người dùng mới.
     */
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
}
