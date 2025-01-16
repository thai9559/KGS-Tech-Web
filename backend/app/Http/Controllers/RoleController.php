<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Lấy danh sách vai trò và người dùng liên quan.
     */
    public function index()
    {
        try {
            $roles = Role::with('users')->get();
    
            return response()->json([
                'success' => true,
                'data' => $roles,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching roles: ' . $e->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch roles.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    /**
     * Hiển thị thông tin vai trò cụ thể kèm danh sách người dùng.
     */
    public function show($id)
    {
        $role = Role::with('users')->find($id);

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $role,
        ], 200);
    }

    /**
     * Tạo vai trò mới.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|unique:roles|max:255',
            'description' => 'nullable|string',
        ]);

        $role = Role::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role,
        ], 201);
    }

    /**
     * Cập nhật vai trò.
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found',
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $role->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role,
        ], 200);
    }

    /**
     * Xóa vai trò.
     */
    public function destroy($id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found',
            ], 404);
        }

        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully',
        ], 200);
    }
}
