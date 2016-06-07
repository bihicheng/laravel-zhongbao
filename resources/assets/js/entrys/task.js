import React from 'react'
import ReactDom from 'react-dom'
import {TaskForm} from '../components/TaskForm'

ReactDom.render(
    <TaskForm />,
    document.getElementById('js-task-form')
)
