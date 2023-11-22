<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
	return 'ok';
});

Route::get('/me', function (Request $request) {
	return response()->json([
		'user' => $request->user()
	], 200);
})->middleware('auth:sanctum');

Route::prefix('product')->middleware('auth:sanctum')->group(function () {
	Route::get('/', [ProductController::class, 'getAll']);
	Route::get('/{product}', [ProductController::class, 'findOne']);
	Route::post('/', [ProductController::class, 'add'])->middleware(['verified']);
	Route::put('/{id}', [ProductController::class, 'update'])->middleware(['verified']);
	Route::delete('/{id}', [ProductController::class, 'delete'])->middleware(['admin', 'verified']);
});

Route::prefix('category')->middleware('auth:sanctum')->group(function () {
	Route::get('/', [CategoryController::class, 'getAll']);
	Route::get('/{category}', [CategoryController::class, 'findOne']);
	Route::post('/', [CategoryController::class, 'add'])->middleware(['admin', 'verified']);
	Route::put('/{id}', [CategoryController::class, 'update'])->middleware(['admin', 'verified']);
	Route::delete('/{id}', [CategoryController::class, 'delete'])->middleware(['admin', 'verified']);
});
