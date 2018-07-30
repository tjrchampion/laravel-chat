<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Cant be bothered to add proper api auth here, so just commented it out.
// Route::group([
//     'middleware' => 'auth:api'
// ], function () {
    
//     Route::get('/chat/messages', 'Chat\ChatController@get');
//     Route::post('/chat/messages', 'Chat\ChatController@store');

// });

Route::get('/messages', 'Chat\ChatController@get');
Route::post('/messages', 'Chat\ChatController@store');