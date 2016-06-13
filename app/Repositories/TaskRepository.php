<?php

/**
 * @Author: bihicheng
 * @Date:   2016-06-06 16:22:22
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-12 10:23:44
 */

namespace App\Repositories;

use App\Task;
use DB;

class TaskRepository {
	/**
	 * 获取所有任务
	 * @return Collection
	 */
	public function all($order_by, $sort, $filter_by, 
							$filter, $perpage=15, $user_id=null) {

		$task_order_by = 'tasks.' . $order_by;
		$task_filter_by = 'tasks.' . $filter_by;
		$where = Task::leftjoin('descriptions', function($join) {
							$join->on('tasks.id', '=', 'descriptions.task_id');
						})->where($task_filter_by, $filter);
		if(!empty($user_id)) {
			$where->where('user_id', $user_id);
		}
		$tasks = $where->orderBy($task_order_by, $sort)
					   ->select('tasks.*', 'descriptions.content')
					   ->paginate($perpage);
					   
		$tasks->appends(['order_by'=>$order_by, 
						'sort'=>$sort, 
						'filter_by'=>$filter_by,
						'filter'=>$filter,
						'perpage'=>$perpage]);
		return $tasks;
	}

	public function task_description() {
		$tasks = DB::table('tasks')
			->leftjoin('descriptions', 'tasks.id', '=', 'descriptions.task_id')
			->get();
		return $tasks;
	}

	/**
	 * 获取任务附件
	 * @return Collection
	 */
	public function attachments($task_id, $type=null) {
		$attachments = Task::find($task_id)->attachments();
		if(!empty($type)) {
			$attachments = $attachments->where('type', $type);
		}
		$attachments->select('id', 'name', 'task_id', 'content_type', 
							 'created_at', 'size', 'extension', 'user_id', 'type');
		return $attachments->get();
	}
}