<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BlogController;



Route::middleware([])->group(function () {
    Route::get('/users', [UserController::class, 'index']); // Danh sách người dùng
    Route::get('/users/{id}', [UserController::class, 'show']); // Xem chi tiết người dùng
    Route::put('/users/{id}', [UserController::class, 'update']);

    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Xóa người dùng
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware([])->group(function () {
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);
});



Route::middleware([])->group(function () {
    Route::get('/user/{id}/roles', [UserRoleController::class, 'index']); // Lấy danh sách vai trò của user
    Route::post('/user/assign-role', [UserRoleController::class, 'assignRole']); // Gán vai trò cho user
    Route::post('/user/remove-role', [UserRoleController::class, 'removeRole']); // Xóa vai trò khỏi user
});



Route::middleware([])->group(function () {
    Route::get('/user/{id}/permissions', [UserPermissionController::class, 'index']); // Lấy danh sách quyền của user
    Route::post('/user/assign-permissions', [UserPermissionController::class, 'assignPermissions']); // Gán nhiều quyền cho user
    Route::post('/user/remove-permissions', [UserPermissionController::class, 'removePermissions']); // Xóa nhiều quyền khỏi user
});

Route::middleware([])->group(function () {
    Route::get('/company', [CompanyController::class, 'getCompany']); // Lấy thông tin công ty
    Route::post('/company', [CompanyController::class, 'createCompany']); // Tạo công ty
    Route::put('/company', [CompanyController::class, 'updateCompany']); // Cập nhật công ty
    Route::delete('/company', [CompanyController::class, 'deleteCompany']); // Xóa công ty

    
    Route::delete('/company/logo', [CompanyController::class, 'deleteLogo']); // Xóa logo
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
});

