<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     return Inertia::render('Index');
// })->name('home');
Route::get('/', function () {
    return view('index');
});
Route::get('/aticle', function () {
    return view('aticle');
});

Route::get('/admin', [AdminController::class, 'admin']);
Route::get('/post', [PostController::class, 'post']);
Route::get('/user', [UserController::class, 'user']);

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
