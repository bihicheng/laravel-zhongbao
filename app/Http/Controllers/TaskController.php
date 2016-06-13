<?php

namespace App\Http\Controllers;

use App\Task;
use App\Description;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Requests\StoreTaskRequest;
use Validator;
use App\Http\Controllers\Controller;
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
            //'amount' => 'required|numeric',
            'phone' => 'required|string',
            'captcha' => 'required|string',
            //'status' => 'required|numeric|status',
            'kind' => 'required|numeric',
            'user_id' => 'required|string',# 测试用
        ]);

        if ($validator->fails()) {
            $errors = $validator->messages()->all();
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                ['msg'=>$errors]);
            return response()->json($response);
        }

        //TODO validate captcha in session

        $title = $request->input('title');
        $description = $request->input('desc', '');
        $preview_at = $request->input('preview_at');
        $commit_at = $request->input('commit_at');
        $deadline_at = $request->input('deadline_at');
        $amount = $request->input('amount');
        $status = $request->input('status', 0);
        $user_id = $request->input('user_id');
        $kind = $request->input('kind');
        $phone = $request->input('phone');

        $task = new Task;
        $task->title = $title;
        $task->preview_at = $preview_at;
        $task->commit_at = $commit_at;
        $task->deadline_at = $deadline_at;
        $task->status = $status;
        $task->user_id = $user_id;
        $task->kind = $kind;
        // $task->amount = $amount;
        $task->phone = $phone;
        $ret = $task->save();
        if ($ret) {
            $desc = new Description;
            $desc->content = $description;
            $desc->task_id = $task->id;
            $ret = $desc->save();           
        }

        if ($ret) {
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
        $task = Task::find($id);

        if (!$task) {
            $response = GetResponse(NOT_SUPPORTED, 'Task Not Found');
        } else {
            $attachments = $task->attachments;
            array_pull($task, 'user_id');
            foreach ($attachments as $attachment) {
                array_pull($attachment, 'data');
                array_pull($attachment, 'user_id');
            }
            $response = GetResponse(OK, ['task' => $task]);
        }

        return response()->json($response);
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
        $task = Task::find($id);

        if (!$task) {
            $response = GetResponse(NOT_SUPPORTED, 'Task Not Found');

            return response()->json($response);
        } else {
            $amount = $task->amount;

            if ($amount > 0) {
                $response = GetResponse(NOT_SUPPORTED, 'Task paid');

                return response()->json($response);
            } else {
                $validator = Validator::make($request->all(), [
                    'title' => 'required|max:255',
                    'deadline_at' => 'required|date_format:Y-m-d H:i:s',
                    'kind' => 'required|numeric',
                    'user_id' => 'required|string',# 测试用
                ]);

                if ($validator->fails()) {
                    $errors = $validator->messages()->all();
                    $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                        ['msg'=>$errors]);
                    return response()->json($response);
                }

                $title = $request->input('title');
                $deadline_at = $request->input('deadline_at');
                $kind = $request->input('kind');
                $description = $request->input('desc', '');

                $task->title = $title;
                $task->deadline_at = $deadline_at;
                $task->kind = $kind;

                if ($task->save()) {
                    $descEntry = $task->description;
                    $descEntry->description = $description;

                    if ($descEntry->save()) {
                        return response()->json(GetResponse(OK, ['task_id' => $id]));
                    } else {
                        return response()->json(GetResponse(FAILED_TO_WRITE_DATABASE, 'Save Desc Failed'));
                    }

                } else {
                    return response()->json(GetResponse(FAILED_TO_WRITE_DATABASE, 'Save task Failed'));
                }
            }
        }
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
