<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function getCompany()
    {
        $company = Company::first();

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
            'logo' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'email' => 'required|email|unique:company,email',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'social_links' => 'nullable|array',
            'admin_user_id' => 'nullable|exists:users,id',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $validatedData['logo'] = $path;
        }

        $company = Company::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Company created successfully',
            'data' => $company,
        ], 201);
    }

    public function updateCompany(Request $request)
{
    $company = Company::first();

    if (!$company) {
        return response()->json([
            'success' => false,
            'message' => 'Company not found',
        ], 404);
    }

    // Log dữ liệu nhận được
    \Log::info('Request data: ', $request->all());

    $validatedData = $request->validate([
        'name' => 'sometimes|required|string|max:255', // Nếu có `name`, thì nó phải hợp lệ
        'logo' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
        'description' => 'nullable|string',
        'website' => 'nullable|url',
        'email' => 'sometimes|required|email|unique:company,email,' . $company->id,
        'phone' => 'nullable|string|max:15',
        'address' => 'nullable|string',
        'social_links' => 'nullable|array',
    ]);

    // Log dữ liệu sau khi validate
    \Log::info('Validated data: ', $validatedData);

    // Xử lý logo nếu có
    if ($request->hasFile('logo')) {
        // Đường dẫn cố định trong thư mục `public`
        $destinationPath = public_path('logo.png');

        // Xóa file logo cũ nếu tồn tại
        if (file_exists($destinationPath)) {
            unlink($destinationPath);
        }

        // Di chuyển file mới vào thư mục `public` với tên cố định
        $request->file('logo')->move(public_path(), 'logo.png');

        // Lưu đường dẫn logo mới vào database
        $validatedData['logo'] = 'logo.png';
    }

    // Cập nhật thông tin công ty
    $company->update($validatedData);

    return response()->json([
        'success' => true,
        'message' => 'Company updated successfully',
        'data' => $company,
    ], 200);
}


    public function deleteLogo()
    {
        $company = Company::first();

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found',
            ], 404);
        }

        if ($company->logo && Storage::disk('public')->exists($company->logo)) {
            Storage::disk('public')->delete($company->logo);
            $company->logo = null;
            $company->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logo deleted successfully',
        ], 200);
    }

    public function deleteCompany()
    {
        $company = Company::first();

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Company not found',
            ], 404);
        }

        if ($company->logo && Storage::disk('public')->exists($company->logo)) {
            Storage::disk('public')->delete($company->logo);
        }

        $company->delete();

        return response()->json([
            'success' => true,
            'message' => 'Company deleted successfully',
        ], 200);
    }
}
