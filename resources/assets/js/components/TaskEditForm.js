import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import {FormTextField, FormTextAreaField, FormDropDown, FormDatePicker, FormPhoneValidator, minDateStart} from './FormField'
import TaskAttachments from './TaskAttachments'
import * as FormActions  from  '../actions/formAction'
import * as ActionTypes from '../actions/actionTypes'
import TaskFormMixins from './TaskFormMixins'

const emptyStr = ''
const TaskEditForm = React.createClass({
    mixins: [TaskFormMixins],
    getInitialState() {
        return {
            files:    [],
            title:    {value: emptyStr, error: emptyStr, readonly: false},
            kind:     {value: emptyStr, error: emptyStr, readonly: false},
            endDate:  {value: moment().add(minDateStart, 'days'), error: emptyStr, readonly: false},
            phone:    {value: emptyStr, error: emptyStr, readonly: false},
            desc:     {value: emptyStr, error: emptyStr, readonly: false}
        }
    },

    render() {
        let options = [{name: '节日', value: 1}, {name: '游戏', value: 2}, {name: '营销', value: 3}]

        return (
            <div className="ui segment basic">
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
                        readonly={this.state.title.readonly}
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
                        readonly={this.state.kind.readonly}
                        name="kind"
                    />
                    <FormDatePicker
                        label="项目截止日期"
                        validateAction={
                            this.getActions([{type: ActionTypes.CHANGE, isAsync: false}], 'endDate')
                        }
                        value={this.state.endDate.value}
                        error={this.state.endDate.error}
                        readonly={this.state.endDate.readonly}
                        name="endDate"
                    />
                    <FormTextField
                        label="手机号码"
                        placeholder="必填"
                        value={this.state.phone.value}
                        readonly={this.state.phone.readonly}
                        name="phone"
                    />
                    <FormTextAreaField
                        label="项目描述"
                        validateAction={
                            this.getActions([{type: ActionTypes.CHANGE, isAsync: false}], 'desc')
                        }
                        value={this.state.desc.value}
                        error={this.state.desc.error}
                        readonly={this.state.desc.readonly}
                        name="desc"
                    />
                    <button className="ui button" type="submit" onClick={this.handleSubmit}>更新</button>
                </div>
                <div className="ui divider"></div>
                <TaskAttachments files={this.state.files} />
            </div>
        )
    }
})

export default TaskEditForm
