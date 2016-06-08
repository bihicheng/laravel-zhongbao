<?php

namespace App\Http\Controllers;

use App\Task;
use App\Description;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Requests\StoreTaskRequest;
use Validator;
use App\Http\Controllers\controller;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    protected $tasks;

    public function __construct(TaskRepository $tasks) {
        $this->tasks = $tasks;
    }

    public function home(Request $request)
    {
        $order_by = $request->input('order_by', 'created_at');
        $sort = $request->input('sort', 'desc');
        $filter_by  = $request->input('filter_by', 'status');
        $filter  = $request->input('filter', 0);
        $perpage = $request->input('perpage', 15);
        $tasks = $this->tasks->all($order_by, $sort, $filter_by, $filter, $perpage);
        return view('vendor.tasks', ['tasks'=>$tasks]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $order_by = $request->input('order_by', 'created_at');
        $sort = $request->input('sort', 'desc');
        $filter_by  = $request->input('filter_by', 'status');
        $filter  = $request->input('filter', 0);
        $perpage = $request->input('perpage', 15);

        if(!in_array($order_by, ['created_at', 'amount', 'deadline_at'])) {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                'order_by is invalidate');
            return response()->json($response);
        }

        if(!in_array($sort, ['asc', 'desc'])) {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                'sort is invalidate');
            return response()->json($response);            
        }

        if(!in_array($filter_by, ['status', 'kind'])) {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                'filter_by is invalidate');
            return response()->json($response);            
        }

        $tasks = $this->tasks->all($order_by, $sort, $filter_by, $filter, $perpage);
        return response()->json($tasks);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function user_task(Request $request)
    {
        # 测试用user_id
        $user_id = env('USER_ID', '55ed066e8e28cd5d358b45c4');
        $order_by = $request->input('order_by', 'created_at');
        $sort = $request->input('sort', 'desc');
        $filter_by  = $request->input('filter_by', 'status');
        $filter  = $request->input('filter', 0);
        $perpage = $request->input('perpage', 15);

        if(!in_array($order_by, ['created_at', 'amount', 'deadline_at'])) {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                'order_by is invalidate');
            return response()->json($response);
        }

        if(!in_array($sort, ['asc', 'desc'])) {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                'sort is invalidate');
            return response()->json($response);            
        }

        if(!in_array($filter_by, ['status', 'kind'])) {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                'filter_by is invalidate');
            return response()->json($response);            
        }
        
        $tasks = $this->tasks->all($order_by, $sort, $filter_by, $filter, 
                                                        $perpage, $user_id);
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('vendor.task_new');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'deadline_at' => 'required|date_format:Y-m-d H:i:s',
            'amount' => 'required|numeric',
            'status' => 'required|numeric|status',
            'kind' => 'required|numeric',
            'user_id' => 'required|string',# 测试用
        ]);

        if($validator->fails()) {
            $errors = $validator->messages()->all();
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                ['msg'=>$errors]);
            return response()->json($response);
        }

        $title = $request->input('title');
        $description = $request->input('description');
        $preview_at = $request->input('preview_at');
        $commit_at = $request->input('commit_at');
        $deadline_at = $request->input('deadline_at');
        $amount = $request->input('amount');
        $status = $request->input('status', 0);
        $user_id = $request->input('user_id');
        $kind = $request->input('kind');

        $task = new Task;
        $task->title = $title;
        $task->preview_at = $preview_at;
        $task->commit_at = $commit_at;
        $task->deadline_at = $deadline_at;
        $task->status = $status;
        $task->user_id = $user_id;
        $task->kind = $kind;
        $task->amount = $amount;
        $ret = $task->save();
        if($ret) {
            $desc = new Description;
            $desc->content = $description;
            $desc->task_id = $task->id;
            $ret = $desc->save();           
        }

        if($ret) {
            $response = GetResponse(OK, ['task_id'=>$task->id, 
                                        'task_title'=>$title]);
        } else {
            $response = GetResponse(INTERNAL_ERROR, 'failed save task.');
        }
        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view('vendor.task_new');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
