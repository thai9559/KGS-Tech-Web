<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;
use Illuminate\Http\Request;


class CompanyController extends Controller
{
    public function getCompany()
    {
        $company = Company::first();
        if ($company) {
            return response()->json([
                'success' => true,
                'data' => $company,
            ]);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'No company data found',
        ], 404);
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
            return response()->json(['success' => false, 'message' => 'Company not found'], 404);
        }
    
        // Log dữ liệu từ request
        \Log::info('Request data:', $request->all());
    
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'email' => 'nullable|email|unique:company,email,' . $company->id,
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'social_links' => 'nullable|array',
        ]);
    
        // Log dữ liệu sau khi validate
        \Log::info('Validated data:', $validatedData);
    
        // Encode social_links nếu cần
        if ($request->has('social_links')) {
            $validatedData['social_links'] = json_encode($request->input('social_links'));
        }
    
        // Cập nhật công ty
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
        return response()->json(['success' => false, 'message' => 'Company not found'], 404);
    }

    $logoPath = public_path($company->logo);
    if (file_exists($logoPath)) {
        unlink($logoPath); // Xóa file logo
    }

    $company->logo = null; // Xóa thông tin trong database
    $company->save();

    return response()->json(['success' => true, 'message' => 'Logo deleted successfully'], 200);
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
 

    public function uploadLogo(Request $request)
{
    $company = Company::first();

    if (!$company) {
        return response()->json([
            'success' => false,
            'message' => 'Company not found',
        ], 404);
    }

    // Validate the logo file
    $validatedData = $request->validate([
        'logo' => 'required|file|image|mimes:jpeg,png,jpg,gif|max:10240',
    ]);

    // Delete the old logo if it exists
    if ($company->logo && Storage::exists($company->logo)) {
        Storage::delete($company->logo);
    }

    // Store the new logo file
    $path = $request->file('logo')->store('uploads', 'public');

    // Generate the full URL
    $fullURL = url(Storage::url($path));

    // Save the full URL in the database
    $company->logo = $fullURL;
    $company->save();

    return response()->json([
        'success' => true,
        'message' => 'Logo uploaded successfully',
        'data' => [
            'logo' => $fullURL, // Return the full URL
        ],
    ], 200);
}


    
    

}
