<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    // Lấy danh sách feedback
    public function index(Request $request)
    {
        // Lấy tất cả feedback
        $feedbacks = Feedback::all();

        return response()->json($feedbacks, 200);
    }

    // Tạo feedback mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $feedback = Feedback::create([
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'content' => $validated['content'],
            'sent_at' => now(),
        ]);

        return response()->json([
            'message' => 'Feedback submitted successfully',
            'data' => $feedback,
        ], 201);
    }
}
