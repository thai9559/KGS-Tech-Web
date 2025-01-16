<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;

class UserPermissionController extends Controller
{
    /**
     * Lấy danh sách toàn bộ quyền.
     */
    public function index()
    {
        $permissions = Permission::all();
        return response()->json([
            'success' => true,
            'data' => $permissions,
        ], 200);
    }

    /**
     * Lấy danh sách quyền của một người dùng cụ thể.
     */
    public function getUserPermissions($userId)
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
        $user->permissions()->syncWithoutDetaching($validatedData['permission_ids']); // Gán quyền mới mà không xóa quyền cũ

        return response()->json([
            'success' => true,
            'message' => 'Permissions assigned successfully',
            'data' => $user->permissions, // Trả về danh sách quyền hiện tại của người dùng
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
        $user->permissions()->detach($validatedData['permission_ids']); // Xóa quyền cụ thể

        return response()->json([
            'success' => true,
            'message' => 'Permissions removed successfully',
            'data' => $user->permissions, // Trả về danh sách quyền còn lại của người dùng
        ], 200);
    }

    /**
     * Gán quyền theo vai trò mặc định (nếu cần).
     */
    public function assignDefaultPermissionsByRole(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::find($validatedData['user_id']);
        $role = $user->role()->with('permissions')->first();

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found or no permissions assigned',
            ], 404);
        }

        // Gán tất cả quyền của vai trò
        $user->permissions()->sync($role->permissions->pluck('id'));

        return response()->json([
            'success' => true,
            'message' => 'Default permissions assigned successfully',
            'data' => $user->permissions,
        ], 201);
    }
}
