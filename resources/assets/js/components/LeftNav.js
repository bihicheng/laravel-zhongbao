import React, {Component} from 'react'
import {Link} from 'react-router'

export default class LeftNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='ui basic'>
                <a className='ui large orange attached fluid button' href='/tasks/new'>
                    创建项目
                </a>
                <div className='ui large attached divided fluid secondary list'>
                    <div className='item'>
                        <Link to='/tasks' activeClassName='active'>项目列表</Link>
                    </div>
                    <div className='item'>
                        <Link to='/user/tasks' activeClassName='active'>我的项目</Link>
                    </div>
                    <div className='item'>
                        <Link to='/user/message' activeClassName='active'>我的消息</Link>
                    </div>
                </div>
            </div>
        )
    }
}
