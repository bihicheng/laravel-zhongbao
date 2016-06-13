import React, {Component} from 'react'

export default class TaskFilter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="ui stackable secondary menu">
                <div className="item">
                    <div className="text">排序方式：</div>
                </div>
                <div className="item">
                    发布日期
                    <i className="sort icon"></i>
                </div>
                <div className="item">
                    截止日期
                    <i className="sort icon"></i>
                </div>
                <div className="item">
                    项目酬金
                    <i className="sort icon"></i>
                </div>
                <div className="right menu">
                    <div className="item">
                        <div className="text">任务状态</div>
                        <i className="dropdown icon"></i>
                    </div>
                    <div className="item">
                        <div className="text">全部分类</div>
                        <i className="dropdown icon"></i>
                    </div>
                </div>
            </div>
        )
    }
}
