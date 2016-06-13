import React, {Component} from 'react'
import LeftNav from './leftNav'

export default class TasksApp extends Component {
    render() {
        return (
            <div className="ui grid stackable">
                <div className="four wide column">
                    <LeftNav />
                </div>
                <div className="twelve wide column">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
