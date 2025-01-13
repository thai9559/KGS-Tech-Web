<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    /**
     * Lấy danh sách quyền của một vai trò.
     */
    public function index($roleId)
    {
        $role = Role::with('permissions')->find($roleId);

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $role->permissions,
        ], 200);
    }

    /**
     * Gán quyền cho một vai trò.
     */
    public function assignPermission(Request $request)
    {
        $validatedData = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $role = Role::find($validatedData['role_id']);
        $permission = Permission::find($validatedData['permission_id']);

        if ($role->permissions()->where('permission_id', $permission->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Permission already assigned to this role',
            ], 400);
        }

        $role->permissions()->attach($permission->id);

        return response()->json([
            'success' => true,
            'message' => 'Permission assigned successfully',
        ], 201);
    }

    /**
     * Xóa quyền khỏi một vai trò.
     */
    public function removePermission(Request $request)
    {
        $validatedData = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $role = Role::find($validatedData['role_id']);
        $permission = Permission::find($validatedData['permission_id']);

        if (!$role->permissions()->where('permission_id', $permission->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Permission not found for this role',
            ], 400);
        }

        $role->permissions()->detach($permission->id);

        return response()->json([
            'success' => true,
            'message' => 'Permission removed successfully',
        ], 200);
    }
}
