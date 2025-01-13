<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Lấy danh sách vai trò.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json([
            'success' => true,
            'data' => $roles
        ], 200);
    }

    /**
     * Tạo vai trò mới.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|unique:roles|max:255',
            'description' => 'nullable|string'
        ]);

        $role = Role::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role
        ], 201);
    }

    /**
     * Hiển thị thông tin vai trò cụ thể.
     */
    public function show($id)
    {
        $role = Role::find($id);
    
        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Role not found'
            ], 404);
        }
    
        return response()->json([
            'success' => true,
            'data' => $role
        ], 200);
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
                'message' => 'Role not found'
            ], 404);
        }
    
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'description' => 'nullable|string'
        ]);
    
        $role->update($validatedData);
    
        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role
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
                'message' => 'Role not found'
            ], 404);
        }
    
        $role->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ], 200);
    }
    
}
