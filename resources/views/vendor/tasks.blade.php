@extends('layouts.list')
@section('title', '任务')

@section('banner')
    @include('components.banner', ['content' => '创建项目 寻找项目 加入项目', 'sub' => '这里所有的项目列表、寻找适合你的、完成它并获得奖励'])
@stop

@section('leftNavbar')
    @include('components.leftNavbar', [])
@stop

@section('mainContainer')
    <div class="ui stackable secondary menu">
        <div class="item">
            <div class="text">排序方式：</div>
        </div>
        <div class="item">
            发布日期
            <i class="sort icon"></i>
        </div>
        <div class="item">
            截止日期
            <i class="sort icon"></i>
        </div>
        <div class="item">
            项目酬金
            <i class="sort icon"></i>
        </div>
        <div class="right menu">
            <div class="item">
                <div class="text">任务状态</div>
                <i class="dropdown icon"></i>
            </div>
            <div class="item">
                <div class="text">全部分类</div>
                <i class="dropdown icon"></i>
            </div>
        </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui relaxed divided list">
    @foreach ($tasks as $task)
        <div class="item">
            <div class="right floated content">
                <h4>{{ $task->amount }}</h4>
            </div>
            <div class="ui tiny left floated image">
                <img src="http://cdn-cn.mugeda.com/weixin/custom-img/mugeda/{{ $task->kind % 2 === 0 ? 'lou_02' : 'new_03'}}.png" />
            </div>
            <div class="content">
                <div class="header">
                    <h4 class="title">{{ $task->title }}</h4>
                </div>
                <div class="extra text">
                    {{ $task->created_at }}
                </div>
                <div class="extra text">
                    {{ $task->deadline_at }}
                </div>
            </div>
        </div>
    @endforeach
    {!! $tasks->render() !!}
    </div>
@stop


@section('script'){{ "//" . env('CND_DOMAIN') . "/assets/tasks.bundle.js" }}@stop
