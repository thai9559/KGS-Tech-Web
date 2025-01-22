<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\ActivityLogController;


Route::middleware([])->group(function () {
    Route::get('/users', [UserController::class, 'index']); // Danh sách người dùng
    Route::get('/users/{id}', [UserController::class, 'show']); // Xem chi tiết người dùng
    Route::put('/users/{id}', [UserController::class, 'update']);

    Route::post('/login', [UserController::class, 'login']);
    // Route::delete('/users/{id}', [UserController::class, 'destroy']); // Xóa người dùng
    // Route::post('/register', [UserController::class, 'register']);
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
});
    Route::post('/register', [UserController::class, 'register'])->middleware('auth:api');
    Route::put('/users/{id}', [UserController::class, 'update'])->middleware('auth:api');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('auth:api');


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return response()->json([
//         'success' => true,
//         'data' => $request->user(),
//     ]);
// });



Route::middleware([])->group(function () {
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);
});



Route::middleware([])->group(function () {
    Route::get('/permissions', [UserPermissionController::class, 'index']);
    Route::get('/user/{id}/permissions', [UserPermissionController::class, 'permissions']);
    Route::post('/user/assign-permissions', [UserPermissionController::class, 'assignPermissions']);
    Route::post('/user/remove-permissions', [UserPermissionController::class, 'removePermissions']);
});


Route::middleware([])->group(function () {
    Route::get('/company', [CompanyController::class, 'getCompany']); // Lấy thông tin công ty
    Route::post('/company', [CompanyController::class, 'createCompany']); // Tạo công ty
    Route::put('/company', [CompanyController::class, 'updateCompany']); // Cập nhật công ty
    Route::delete('/company', [CompanyController::class, 'deleteCompany']); // Xóa công ty
    Route::delete('/company/logo', [CompanyController::class, 'deleteLogo']); // Xóa logo
    Route::post('/company/logo', [CompanyController::class, 'uploadLogo']);

});



Route::middleware([])->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']); 
    Route::post('/categories', [CategoryController::class, 'store']); 
    Route::get('/categories/{id}', [CategoryController::class, 'show']); 
    Route::put('/categories/{id}', [CategoryController::class, 'update']); 
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); 
});


Route::middleware([])->group(function () {
    Route::get('/blogs', [BlogController::class, 'index']); // Lấy danh sách bài viết
    Route::post('/blogs', [BlogController::class, 'store']); // Tạo bài viết mới
    Route::get('/blogs/{id}', [BlogController::class, 'show']); // Lấy thông tin chi tiết bài viết
    Route::put('/blogs/{id}', [BlogController::class, 'update']); // Cập nhật bài viết
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']); // Xóa bài viết
    Route::post('/upload-image', [BlogController::class, 'uploadImage']);
    Route::put('/blogs/{id}/visibility', [BlogController::class, 'updateVisibility']);

});
    Route::middleware([])->group(function () {
    Route::get('/tags', [TagController::class, 'index']);
    Route::post('/tags', [TagController::class, 'store']);
    Route::put('/tags/{id}', [TagController::class, 'update']);
    Route::delete('/tags/{id}', [TagController::class, 'destroy']);
    
});
Route::middleware([])->group(function () {
    Route::get('/feedback', [FeedbackController::class, 'index']); // Lấy danh sách feedback
    Route::post('/feedback', [FeedbackController::class, 'store']); // Tạo feedback mới
    Route::patch('/feedback/{id}/visibility', [FeedbackController::class, 'updateVisibility']);

});
Route::middleware([])->group(function () {
Route::get('/activity-logs', [ActivityLogController::class, 'index']); // Lấy danh sách log
Route::get('/activity-logs/{id}', [ActivityLogController::class, 'show']); // Xem chi tiết log
Route::delete('/activity-logs/{id}', [ActivityLogController::class, 'destroy']); // Xóa log

});
