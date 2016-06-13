<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'TaskController@home');
Route::get('/tasks', 'TaskController@home');
Route::get('/tasks/new', 'TaskController@create');
Route::get('/tasks/{id}/edit', 'TaskController@edit');

Route::get('/user/tasks', 'TaskController@home');
Route::get('/user/message', 'TaskController@home');
