<?php

namespace App\Http\Controllers;

use App\Models\RecruitmentPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecruitmentPageController extends Controller
{
    public function index()
    {
        $recruitments = RecruitmentPage::all();
        return response()->json($recruitments);
    }

    public function store(Request $request)
{
    // Kiểm tra nếu email đã ứng tuyển cho cùng một vị trí
    $existingApplication = RecruitmentPage::where('email', $request->email)
        ->where('position_apply', $request->position_apply)
        ->exists(); // Sử dụng exists() để trả về true/false

    if ($existingApplication) {
        return response()->json([
            'success' => false,
            'message' => 'Bạn đã ứng tuyển vị trí này rồi.'
        ], 200); // Trả về 200 OK nhưng `success: false`
    }

    // Xác thực dữ liệu đầu vào
    $request->validate([
        'fullname' => 'required|string|max:255',
        'email' => 'required|email',
        'phone' => 'required|string|max:20',
        'position_apply' => 'required|string|max:255',
        'technology' => 'nullable|string|max:255',
        'cv' => 'required|file|mimes:pdf,doc,docx|max:2048', // 2MB
    ]);

    // Kiểm tra nếu có file CV
    if ($request->hasFile('cv')) {
        $cvPath = $request->file('cv')->store('cvs', 'public');
    } else {
        return response()->json([
            'success' => false,
            'message' => 'File upload failed'
        ], 200);
    }

    // Lưu dữ liệu vào database
    $recruitment = RecruitmentPage::create([
        'fullname' => $request->fullname,
        'email' => $request->email,
        'phone' => $request->phone,
        'position_apply' => $request->position_apply,
        'technology' => $request->technology,
        'cv_path' => $cvPath, // ✅ Lưu đường dẫn file CV vào database
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Application submitted successfully',
        'data' => $recruitment
    ], 200);
}

    public function show($id)
    {
        $recruitment = RecruitmentPage::findOrFail($id);
        return response()->json($recruitment);
    }

    public function destroy($id)
    {
        $recruitment = RecruitmentPage::findOrFail($id);
        Storage::disk('public')->delete($recruitment->cv_path); // Xóa file CV thực tế
        $recruitment->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }
}
