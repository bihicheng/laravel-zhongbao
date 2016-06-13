import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import {FormTextField, FormTextAreaField, FormDropDown, FormDatePicker, FormPhoneValidator, minDateStart} from './FormField'
import TaskFormMixins from './TaskFormMixins'
import * as ActionTypes from '../actions/actionTypes'

export const emptyStr = ''
const loadingStr = 'loading'

export const TaskForm = React.createClass({
    mixins: [TaskFormMixins],
    getInitialState() {
        return {
            submitLoading: false,
            submitError: emptyStr,
            remaining: 0,
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
        let formClassName = "ui form stackable"
        let responseInfo = emptyStr

        if (this.state.submitLoading) {
            formClassName += ' loading'
        }

        if (this.state.submitError) {
            responseInfo = this.handleSubmitError()
        }

        return (
            <div className={formClassName}>
                {responseInfo}
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
                <FormPhoneValidator
                    label="手机号码"
                    placeholder="必填"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false},
                                         {type: ActionTypes.BLUR, isAsync: false}], 'phone')
                    }
                    remaining={this.state.remaining}
                    getCaptcha={this.getCaptcha}
                    value={this.state.phone.value}
                    error={this.state.phone.error}
                    name="phone"
                />
                <FormTextField
                    label="验证码"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false},
                                         {type: ActionTypes.BLUR, isAsync: true}], 'captcha')
                    }
                    value={this.state.captcha.value}
                    error={this.state.captcha.error}
                    placeholder="必填"
                    name="captcha"
                />
                <FormTextAreaField
                    label="项目描述"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false}], 'desc')
                    }
                    error={this.state.desc.error}
                    value={this.state.desc.value}
                    name="desc"
                />
                <div className="ui grid stackable">
                    <div className="two wide column"></div>
                    <div className="four wide column">
                        <button className="ui orange button" type="submit" onClick={this.submitTaskForm}>提交任务</button>
                    </div>
                </div>
            </div>
        )
    }
})
