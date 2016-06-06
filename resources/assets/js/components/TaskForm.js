import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import {FormTextField, FormTextAreaField, FormDropDown, FormDatePicker} from './FormField'

let TaskForm = React.createClass({
    getInitialState() {
        return {
            options: [{name: 'mugeda', value: 1}, {name: 'adegum', value: 2}],
            endDate: moment()
        }
    },
    render() {
        return (
            <div className="ui form column stackable grid">
                <FormTextField label="项目名称" placeholder="必填" value={this.props.name || ''} />
                <FormDropDown label="项目类别" value={this.props.kind || ''} options={this.state.options} />
                <FormDatePicker label="项目截止日期" value={this.state.endDate} />
                <FormTextAreaField label="项目描述" value={this.props.description || ''} />
            </div>
        )
    }
})

TaskForm.propTypes = {
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
}

export default TaskForm
