import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {TaskForm} from '../components/TaskForm'
import TaskEditForm from '../components/TaskEditForm'

require('../../less/app.less')

render((
  <Router history={browserHistory}>
    <Route path="/tasks/new" component={TaskForm} />
    <Route path="/tasks/:taskId/edit" component={TaskEditForm} />
  </Router>
), document.getElementById('js-task-form'))
