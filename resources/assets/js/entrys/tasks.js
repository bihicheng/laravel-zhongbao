import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import TasksApp from '../components/TasksApp'
import Tasks from '../components/Tasks'
import MyTasks from '../components/MyTasks'
import Message from '../components/Message'

require('../../less/app.less')

render((
    <Router history={browserHistory}>
        <Route path="/" component={TasksApp}>
            <Route path='/tasks' component={Tasks} />
            <Route path='/user/tasks' component={MyTasks} />
            <Route path='/user/message' component={Message} />
        </Route>
    </Router>
), document.getElementById('js-tasks-container'))
