<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\TransactionController;

// public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/transactions', [TransactionController::class, 'index']);

    Route::post('/purchase', [PurchaseController::class, 'store']);

    Route::get('/users/{user}/achievements', [AchievementController::class, 'index']);
});