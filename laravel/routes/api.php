<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategorieController;
use App\Http\Controllers\API\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::post('upProfile', [AuthController::class, 'updateProfile']);
});

Route::controller(CategorieController::class)->group(function () {

    Route::prefix('categories')->group(function () {
        Route::get('/categories', 'categories');
        //all categories with pagination *
        Route::get('/all', 'index');
        //all Main categories *
        Route::get('/sub', 'subCategory');
        // single categories
        Route::get('/{id}', 'categorie');
        // single sub categories
        Route::get('/sub/{id}', 'subCategorie');
        // create categories *
        Route::post('/add', 'store');
        // create sub categories *
        Route::post('/addsub', 'storeSubCategories');
        // Update categories
        Route::post('/up/{id}', 'update');
        // destroy  categories
        Route::delete('/{id}', 'destroy');

        Route::get('test', 'creteFoldersInPublic');
    });
});


Route::controller(UsersController::class)->group(function () {

    Route::prefix('users')->group(function () {
        //all users *
        Route::get('/all', 'users');
        //show single user  *
        Route::get('/{id}', 'user');
        // create user*
        Route::post('/add', 'store');
        // Update categories
        Route::post('/up/{id}', 'update');
        // destroy  categories
        Route::delete('/{id}', 'destroy');
    });
});
