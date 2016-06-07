import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import {FormTextField, FormTextAreaField, FormDropDown, FormDatePicker, FormPhoneValidator, minDateStart} from './FormField'
import * as FormActions  from  '../actions/formAction'
import * as ActionTypes from '../actions/actionTypes'
import TaskFormMixins from './TaskFormMixins'

const emptyStr = ''
const TaskEditForm = React.createClass({
    mixins: [TaskFormMixins],
    getInitialState() {
        return {
            title:    {value: emptyStr, error: emptyStr},
            kind:     {value: emptyStr, error: emptyStr},
            endDate:  {value: moment().add(minDateStart, 'days'), error: emptyStr},
            phone:    {value: emptyStr, error: emptyStr},
            captcha:  {value: emptyStr, error: emptyStr},
            desc:     {value: emptyStr, error: emptyStr}
        }
    },

    render() {
        let options = [{name: '节日', value: 1}, {name: '游戏', value: 2}, {name: '营销', value: 3}]

        return (
            <div className="ui form stackable">
                <FormTextField
                    label="项目名称"
                    placeholder="必填"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false},
                                         {type: ActionTypes.BLUR, isAsync: false}], 'title')
                    }
                    value={this.state.title.value}
                    error={this.state.title.error}
                    name="title"
                />
                <FormDropDown
                    label="项目类别"
                    defaultText="请选择项目类别"
                    value={this.state.kind.value}
                    error={this.state.kind.error}
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false}], 'kind')
                    }
                    options={options}
                    name="kind"
                />
                <FormDatePicker
                    label="项目截止日期"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false}], 'endDate')
                    }
                    value={this.state.endDate.value}
                    error={this.state.endDate.error}
                    name="endDate"
                />
                <FormTextField
                    label="手机号码"
                    placeholder="必填"
                    value={this.state.phone.value}
                    name="phone"
                />
                <FormTextAreaField
                    label="项目描述"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false}], 'desc')
                    }
                    value={this.state.desc.value}
                    name="desc"
                />
                <button className="ui button" type="submit" onClick={this.handleSubmit}>提交</button>
            </div>
        )
    }
})

export default TaskEditForm
