<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class FeedbackController extends Controller
{
    // Lấy danh sách feedback (bao gồm ẩn hoặc chỉ hiển thị)
    public function index(Request $request)
    {
        // Nếu có tham số ?visible=true, chỉ hiển thị feedback đang hiển thị
        $feedbacks = Feedback::when($request->has('visible'), function ($query) use ($request) {
            $query->where('is_visible', filter_var($request->visible, FILTER_VALIDATE_BOOLEAN));
        })->get();

        return response()->json($feedbacks, 200);
    }

    // Tạo feedback mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
            'is_visible' => 'boolean',
        ]);

        $feedback = Feedback::create([
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'sent_at' => now(),
            'is_visible' => $validated['is_visible'] ?? true, // Mặc định là true
        ]);

        return response()->json([
            'message' => 'Feedback submitted successfully',
            'data' => $feedback,
        ], 201);
    }

    // Cập nhật trạng thái ẩn/hiện
    public function updateVisibility(Request $request, $id)
    {
        Log::info('Request to update visibility', [
            'id' => $id,
            'is_visible' => $request->input('is_visible'),
        ]);
    
        $feedback = Feedback::findOrFail($id);
    
        $validated = $request->validate([
            'is_visible' => 'required|boolean',
        ]);
    
        $feedback->update(['is_visible' => $validated['is_visible']]);
    
        return response()->json([
            'message' => 'Visibility updated successfully',
            'data' => $feedback,
        ]);
    }
}
