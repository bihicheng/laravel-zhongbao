<?php
/**
 * @Author: bihicheng
 * @Date:   2016-06-06 14:58:52
 * @Last Modified by:   bihicheng
 * @Last Modified time: 2016-06-12 11:03:45
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Task;
use App\Attachment;
use Validator;

class AttachmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'task_id' => 'required|numeric',
            'type' => 'required|numeric',
            'file' => 'required',
        ]);

        if($validator->fails()) {
            $errors = $validator->messages()->all();
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT, 
                                                ['msg'=>$errors]);
            return response()->json($response);
        }
        $type = $request->input('type');
        $task_id = $request->input('task_id');
        $file = $request->file('file');
        $filepath = $file->getRealPath();
        $fileext = $file->getClientOriginalExtension();
        $filename = $file->getClientOriginalName();
        $filesize = $file->getClientSize();
        $mimetype = $file->getClientMimeType();
       
        $task = Task::find($task_id);
        if(!$task) {
            $response = GetResponse(INTERNAL_ERROR, 'task_id is invalidate.');
            return response()->json($response);            
        }
        $filecontents = file_get_contents($filepath);
        $attachment = new Attachment;
        $attachment->type = $type;
        $attachment->task_id = $task_id;
        $attachment->name = $filename;
        $attachment->size = $filesize;
        $attachment->extension = $fileext;
        $attachment->content_type = $mimetype;
        $attachment->data = $filecontents;
        $attachment->user_id = '55ed066e8e28cd5d358b45c4';
        $ret = $attachment->save();
        if($ret) {
            $response = GetResponse(OK, ['attachment_id'=>$attachment->id, 
                                        'task_title'=>$task->title, 
                                        'attachment_name'=>$filename]);
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
        $attachment = Attachment::find($id);
        $headers = ['Content-Type' => $attachment->content_type];
        return response($attachment->data, 200, $headers);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $attachment = Attachment::find($id);

        if ($attachment) {
            $attachment->delete();
            $response = GetResponse(OK, ['id' => $id]);
        } else {
            $response = GetResponse(NOT_SUPPORTED);
        }

        return response()->json($response);
    }
}
