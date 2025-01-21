<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * Lấy danh sách log hoạt động.
     */
    public function index()
    {
        $logs = ActivityLog::with('user')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $logs,
        ], 200);
    }

    /**
     * Xem chi tiết một log.
     */
    public function show($id)
    {
        $log = ActivityLog::with('user')->find($id);

        if (!$log) {
            return response()->json([
                'success' => false,
                'message' => 'Log not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $log,
        ], 200);
    }

    /**
     * Xóa một log.
     */
    public function destroy($id)
    {
        $log = ActivityLog::find($id);

        if (!$log) {
            return response()->json([
                'success' => false,
                'message' => 'Log not found',
            ], 404);
        }

        $log->delete();

        return response()->json([
            'success' => true,
            'message' => 'Log deleted successfully',
        ], 200);
    }

    /**
     * Ghi log hoạt động.
     */
    public static function log($userId, $action, $tableName, $recordId, $oldData = null, $newData = null)
    {
        ActivityLog::create([
            'user_id' => $userId,
            'action' => $action,
            'table_name' => $tableName,
            'record_id' => $recordId,
            'old_data' => $oldData ? json_encode($oldData) : null,
            'new_data' => $newData ? json_encode($newData) : null,
        ]);
    }
}
