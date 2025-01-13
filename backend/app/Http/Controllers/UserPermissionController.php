<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;

class UserPermissionController extends Controller
{
    /**
     * Lấy danh sách quyền của người dùng.
     */
    public function index($userId)
    {
        $user = User::with('permissions')->find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user->permissions,
        ], 200);
    }

    /**
     * Gán nhiều quyền cho người dùng.
     */
    public function assignPermissions(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_ids' => 'required|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $user = User::find($validatedData['user_id']);
        $user->permissions()->syncWithoutDetaching($validatedData['permission_ids']);

        return response()->json([
            'success' => true,
            'message' => 'Permissions assigned successfully',
        ], 201);
    }

    /**
     * Xóa nhiều quyền khỏi người dùng.
     */
    public function removePermissions(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_ids' => 'required|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $user = User::find($validatedData['user_id']);
        $user->permissions()->detach($validatedData['permission_ids']);

        return response()->json([
            'success' => true,
            'message' => 'Permissions removed successfully',
        ], 200);
    }
}
