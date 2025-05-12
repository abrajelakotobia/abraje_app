<?php


use App\Http\Controllers\PostsController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MessangerController;
use App\Http\Controllers\AdminChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TestController::class, 'dashboard'])->name('dashboard');

    // Chat Routes
    Route::get('/chat', [MessageController::class, 'index'])->name('chat');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    // Posts Routes
    Route::resource('posts', PostsController::class);
    Route::get('/posts/{post}', [PostsController::class, 'show'])->name('posts.show');

    // Bookings Routes
    Route::resource('bookings', BookingController::class);

    // Admin-Specific Routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/users', [TestController::class, 'admin'])->name('admin.users');
        Route::get('/admin/messangers', [MessangerController::class, 'adminView'])->name('admin.messangers');
    });

    // Super Admin-Specific Routes
    Route::middleware('role:superadmin')->group(function () {
        Route::get('/superadmin/system', [TestController::class, 'superadmin'])->name('superadmin.system');
    });

    // Admin Chat Routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/chat', [AdminChatController::class, 'index']);
        Route::post('/chat', [AdminChatController::class, 'store']);
    });

    // Toggle Post Status (Super Admin Only)
    Route::middleware('isSuperAdmin')->group(function () {
        Route::put('/admin/posts/{post}/toggle', [PostsController::class, 'toggleStatus']);
    });
});

// Contact Routes
Route::resource('contacts', ContactController::class);

// Messanger Routes
Route::get('/messanger', [MessangerController::class, 'index'])->name('messanger');
Route::post('/messanger', [MessangerController::class, 'store']);

// Include Additional Route Files
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
