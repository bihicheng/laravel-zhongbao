@extends('layouts.list')
@section('title', '任务')

@section('banner')
    @include('components.banner', ['content' => '创建项目 寻找项目 加入项目', 'sub' => '这里所有的项目列表、寻找适合你的、完成它并获得奖励'])
@stop

@section('mainContainer')
    <div class="segment" id="js-tasks-container"></div>
@stop

@section('script'){{ "//" . env('CND_DOMAIN') . "/assets/tasks.bundle.js" }}@stop
