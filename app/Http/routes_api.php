<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-06 14:58:52
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-07-01 18:06:59
 */

Route::group(['prefix' => 'api/v1', 'middleware' => 'auth'], function() {
    Route::resource('tasks', 'TaskController', ['only'=>['index', 'store', 'show', 'update']]);
    Route::resource('attachments', 'AttachmentController', ['only' => ['store', 'destroy']]);
    Route::get('/user_task', 'TaskController@user_task')
    						->name('api.v1.tasks.user_task');
    Route::post('/{phone}/captcha', 'CaptchaController@create');
    Route::get('/captcha/validate', 'CaptchaController@get');
    Route::get('/tasks/{id}/attachments', 'TaskController@task_attachments')->name('api.v1.tasks.task_attachments');
});
