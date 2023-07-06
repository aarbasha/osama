<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategorieController;
use App\Http\Controllers\API\OrdersController;
use App\Http\Controllers\API\PostsController;
use App\Http\Controllers\API\TasksController;
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

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('profile', [AuthController::class, 'profile']);
        Route::post('upProfile', [AuthController::class, 'updateProfile']);

        Route::post('refresh-token', [AuthController::class, 'RefreshToken']);


        Route::post('setOnline', [AuthController::class, 'setOnline']);
        Route::get('users/online', [AuthController::class, 'online']);

        Route::get('test', [AuthController::class, 'test']);

        Route::post('/logoutUser/{id}', 'logoutAnyUser');
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
            // get users online
        });
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

    Route::controller(PostsController::class)->group(function () {
        Route::prefix('posts')->group(function () {
            //all posts and pagination *
            Route::get('/all', 'Posts');

            Route::get('/posts', 'all_Posts');
            //show post single  *
            Route::get('/{id}', 'Post');
            // create post*
            Route::post('/add', 'store');
            // Update categories
            Route::post('/up/{id}', 'update');
            // destroy  categories
            Route::delete('/{id}', 'destroy');
            // get users online
            //  Route::get('//{id}', 'path');

            // delete image post
            Route::post('/deleteImage/{id}', 'DeleteImage');
            // delete cover post
            Route::post('/deleteCover/{id}', 'deletecover');
        });
    });

    Route::controller(OrdersController::class)->group(function () {
        Route::prefix('orders')->group(function () {
            //all order *
            Route::get('/all', 'orders');
            //show order single  *
            Route::get('/{id}', 'order');
            // destroy  categories
            Route::delete('/{id}', 'destroy');
        });
    });

    Route::controller(TasksController::class)->group(function () {
        Route::prefix('tasks')->group(function () {
            //all tasks *
            Route::get('/all', 'tasks');
            //show tasks single  *
            Route::get('/{id}', 'task');
            // add task
            Route::post('/add', 'store');
            //create tasks from orders
            Route::post('/{id}', 'create');
            // update task
            Route::post('/up/{id}', 'update');
            // destroy  tasks
            Route::delete('/{id}', 'destroy');
        });
    });
});

Route::post('/add-order', [OrdersController::class, 'store']);
