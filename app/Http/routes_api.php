<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-06 14:58:52
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-12 10:40:29
 */

Route::group(array('prefix' => 'api/v1'), function() {
    Route::resource('tasks', 'TaskController', ['only'=>['index', 'store', 'show']]);
    Route::resource('attachments', 'AttachmentController', ['only' => ['store', 'show']]);
    Route::get('/user_tasks', 'TaskController@user_task')->name('api.v1.tasks.user_task');
    Route::get('/tasks/{id}/attachments', 'TaskController@task_attachments')->name('api.v1.tasks.task_attachments');
});
