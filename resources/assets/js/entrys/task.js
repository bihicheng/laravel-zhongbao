import React from 'react'
import ReactDom from 'react-dom'
import TaskForm from '../components/TaskForm'

ReactDom.render(
    <TaskForm name="test"
              kind='0'
              endDate="2016-05-28"
              phone="1368798989" />,
    document.getElementById('js-task-form')
)
