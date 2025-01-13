<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserRoleController extends Controller
{
    /**
     * Lấy danh sách vai trò của người dùng.
     */
    public function index($userId)
    {
        $user = User::with('roles')->find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user->roles,
        ], 200);
    }

    /**
     * Gán vai trò cho người dùng.
     */
    public function assignRole(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::find($validatedData['user_id']);
        $role = Role::find($validatedData['role_id']);

        if ($user->roles()->where('role_id', $role->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'User already has this role',
            ], 400);
        }

        $user->roles()->attach($role->id);

        return response()->json([
            'success' => true,
            'message' => 'Role assigned successfully',
        ], 201);
    }

    /**
     * Xóa vai trò khỏi người dùng.
     */
    public function removeRole(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::find($validatedData['user_id']);
        $role = Role::find($validatedData['role_id']);

        if (!$user->roles()->where('role_id', $role->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'User does not have this role',
            ], 400);
        }

        $user->roles()->detach($role->id);

        return response()->json([
            'success' => true,
            'message' => 'Role removed successfully',
        ], 200);
    }
}
