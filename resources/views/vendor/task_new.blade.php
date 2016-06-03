@extends('layouts.meta')
@section('title', '创建任务')

@section('banner')
    @include('components.banner', ['content' => '创建项目 寻找项目 加入项目', 'sub' => '这里所有的项目列表、寻找适合你的、完成它并获得奖励'])
@stop

@section('mainContainer')
    <div class="segment">
        <div class="ui form column stackable grid">
            <div class="row">
                <div class="two wide column right aligned">
                    <label>项目名称</label>
                </div>
                <div class="four wide column">
                    <input type="text" placeholder="必填" />
                </div>
            </div>
            <div class="row">
                <div class="two wide column right aligned">
                    <label>项目类别</label>
                </div>
                <div class="four wide column">
                    <input type="text" placeholder="必填" />
                </div>
            </div>
            <div class="row">
                <div class="two wide column right aligned">
                    <label>项目截止日期</label>
                </div>
                <div class="four wide column">
                    <input type="text" placeholder="必填" />
                </div>
            </div>
            <div class="row">
                <div class="two wide column right aligned">
                    <label>项目描述</label>
                </div>
                <div class="eight wide column">
                    <textarea class="left float" rows="5"></textarea>
                </div>
            </div>
        </div>
    </div>
@stop
