import React, {Component} from 'react'
import TaskFilter from './TaskFilter'


const emptyStr = ''
class Task extends Component {
    render() {
        const {task} = this.props

        let thumbPath = 'new_03.png'

        if (task.kind % 2 === 0) {
            thumbPath = 'lou_02.png'
        }

        let thumbUrl = `http://cdn-cn.mugeda.com/weixin/custom-img/mugeda/${thumbPath}`

        return (
            <div className="item">
                <div className="right floated content">
                    <h4>{task.amount}</h4>
                </div>
                <div className="ui tiny left floated image">
                    <img src={thumbUrl} />
                </div>
                <div className="content">
                    <div className="header">
                        <h4 className="title">{task.title}</h4>
                    </div>
                    <div className="extra text">
                        {task.created_at}
                    </div>
                    <div class="extra text">
                        {task.deadline_at}
                    </div>
                </div>
            </div>
                
        )
    }
}

class TaskList extends Component {
    render() {
        return (
            <div className="ui relaxed divided list">
                {
                    this.props.tasks.map((task, index) => {
                        return <Task task={task} key={index} />
                    })
                }
            </div>
        )
    }
}

const Tasks = React.createClass({
    getInitialState() {
        return {
            requestError: emptyStr,
            loading:      true,
            tasks:        []
        }
    },

    getTasksFromServer() {
        return $.getJSON('/api/v1/tasks')
    },

    componentDidMount() {
        this.getTasksFromServer().then(
            (response) => {
                if (response.status === 0) {
                    this.setState(Object.assign({}, this.state, {
                        loading: false,
                        tasks: response.tasks.data
                    }))
                } else {
                
                }
            },

            (error) => {
            
            }
        )
    
    },

    render() {
        return (
            <div className="ui basic">
                <TaskFilter />
                <TaskList tasks={this.state.tasks}/>
            </div>
        )
    }
})

export default Tasks
