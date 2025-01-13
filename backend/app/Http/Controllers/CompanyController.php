<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Lấy thông tin công ty.
     */
    public function getCompany()
    {
        $company = Company::first(); // Lấy công ty đầu tiên

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $company,
        ], 200);
    }

    /**
     * Tạo mới công ty (chỉ thực hiện nếu chưa có công ty).
     */
    public function createCompany(Request $request)
    {
        $existingCompany = Company::first();

        if ($existingCompany) {
            return response()->json([
                'success' => false,
                'message' => 'A company already exists',
            ], 400);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'email' => 'required|email|unique:company,email',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'social_links' => 'nullable|array',
            'admin_user_id' => 'nullable|exists:users,id',
        ]);

        $company = Company::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Company created successfully',
            'data' => $company,
        ], 201);
    }

    /**
     * Cập nhật thông tin công ty.
     */
    public function updateCompany(Request $request)
    {
        $company = Company::first();

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found',
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'email' => 'required|email|unique:company,email,' . $company->id,
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'social_links' => 'nullable|array',
            'admin_user_id' => 'nullable|exists:users,id',
        ]);

        $company->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Company updated successfully',
            'data' => $company,
        ], 200);
    }

    /**
     * Xóa thông tin công ty.
     */
    public function deleteCompany()
    {
        $company = Company::first();

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found',
            ], 404);
        }

        $company->delete();

        return response()->json([
            'success' => true,
            'message' => 'Company deleted successfully',
        ], 200);
    }
}
