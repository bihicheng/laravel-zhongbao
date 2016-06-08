<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-06 14:58:52
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-08 14:08:40
 */

Route::group(array('prefix' => 'api/v1'), function() {
    Route::resource('task', 'TaskController', ['only'=>['index', 'store']]);
    Route::resource('attachement', 'AttachementController', ['only' => ['store']]);
    Route::get('/user_task', 'TaskController@user_task')
    						->name('api.v1.tasks.user_task');
});
