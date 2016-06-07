import React, {PropTypes, Component} from 'react'
import moment from 'moment'
import {FormTextField, FormTextAreaField, FormDropDown, FormDatePicker, FormPhoneValidator, minDateStart} from './FormField'
import * as FormActions  from  '../actions/formAction'
import * as ActionTypes from '../actions/actionTypes'

const emptyStr = ''
const loadingStr = 'loading'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const TaskForm = React.createClass({
    getInitialState() {
        return {
            remaining: 0,
            title:    {value: emptyStr, error: emptyStr},
            kind:     {value: emptyStr, error: emptyStr},
            endDate:  {value: moment().add(minDateStart, 'days'), error: emptyStr},
            phone:    {value: emptyStr, error: emptyStr},
            captcha:  {value: emptyStr, error: emptyStr},
            desc:     {value: emptyStr, error: emptyStr}
        }
    },

    getActionByType(actionType, fieldName) {
        const type = capitalizeFirstLetter(actionType)
        return FormActions[fieldName + type] || (() => ({}))
    },

    getActions(actionTypes=[], fieldName) {
        let self = this
        let actions = []

        actionTypes.forEach((item) => {
            actions.push(self.getValidateAction(item.type, fieldName, item.isAsync))
        })

        return actions
    },

    getValidateAction(actionType, fieldName, isAsync) {
        let self = this
        const action = this.getActionByType(actionType, fieldName)
        const merge = (changeState={}) => {
            return Object.assign({}, self.state, changeState)
        }

        const handler = (inputObj) => {
            if (isAsync) {
                self.setState(merge({
                    [fieldName]: {error: loadingStr}
                }))
            }

            let actionResult = action(inputObj)
            if (actionResult.then) {
                actionResult.then((newVal, error) => {
                    self.setState(merge({
                        [fieldName]: {value: newVal, error: error}
                    }))
                }, (error) => {
                    let oldVal = self.state[fieldName].value
                    self.setState(merge({
                        [fieldName]: {value: oldVal, error: error}
                    }))
                });
            } else {
                if (inputObj.target) {
                    self.setState(merge({
                        [fieldName]: {value: inputObj.target.value}
                    }))
                }
            }
        }

        handler.bind(this)

        return {
            type: actionType,
            handler: handler
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
                <FormPhoneValidator
                    label="手机号码"
                    placeholder="必填"
                    validateAction={
                        this.getActions([{type: ActionTypes.CHANGE, isAsync: false}, 
                                         {type: ActionTypes.BLUR, isAsync: false}], 'phone')
                    }
                    remaining={this.state.remaining}
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
                    value={this.state.desc.value}
                    name="desc"
                />
                <button className="ui button" type="submit" onClick={this.handleSubmit}>提交</button>
            </div>
        )
    }
})

export class TaskEditForm extends TaskForm {
    componentDidMount() {
    
    }

    render() {
    
    
    }
}
