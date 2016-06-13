import React from 'react'
import * as FormActions  from  '../actions/formAction'
import * as ActionTypes from '../actions/actionTypes'


const loadingStr = 'loading'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const mergeState = (state, entry) => {
    return Object.assign({}, state, entry)
}

const TaskFormMixins = {
    submitTaskForm() {
        let submit = FormActions.submitTaskForm
        submit.bind(this)();
    },

    handleSubmitError() {
        let submitError = this.state.submitError
        let responseInfo = ''

        if (Object.prototype.toString.call(submitError) === '[object Array]') {
            responseInfo = submitError.map((error, index) => {
                return <div key={index}>{error}</div>
            })
        } else {
            responseInfo = submitError
        }

        return (
            <div className="ui column grid">
                <div className="ten wide column ">
                    <div className="ui negative message">{responseInfo}</div>
                    <div className="ui divider"></div>
                </div>
            </div>
        )
    },

    getCaptcha() {
        let phone = this.state.phone.value
        let error = this.state.phone.error

        if (error) {
            return
        }

        FormActions.getCaptcha(phone).then((response) => {
            let remaining = 60
            let t = setInterval(() => {
                if (remaining === 0) {
                    clearInterval(t)
                    return
                }

                this.setState(mergeState(this.state, {remaining: --remaining}))
            }, 1000)
        }, (error) => {
            this.setState(mergeState(this.state, {phone: {value: phone, error: error}}))
        })
    },

    getActionByType(actionType, fieldName) {
        const type = capitalizeFirstLetter(actionType)
        return FormActions[fieldName + type] || (() => ({}))
    },

    getActions(actionTypes=[], fieldName) {
        let actions = []

        actionTypes.forEach((item) => {
            actions.push(this.getValidateAction(item.type, fieldName, item.isAsync))
        })

        return actions
    },

    getValidateAction(actionType, fieldName, isAsync) {
        const action = this.getActionByType(actionType, fieldName)
        const merge = (changeState={}) => {
            return Object.assign({}, this.state, changeState)
        }

        const handler = (inputObj) => {
            if (isAsync) {
                let oldVal = this.state[fieldName].value
                this.setState(merge({
                    [fieldName]: {value: oldVal, error: loadingStr}
                }))
            }

            let actionResult = action(inputObj)
            if (actionResult.then) {
                actionResult.then((result) => {
                    let [newVal, error] = result
                    this.setState(merge({
                        [fieldName]: {value: newVal, error: error}
                    }))
                }, (error) => {
                    let oldVal = this.state[fieldName].value
                    this.setState(merge({
                        [fieldName]: {value: oldVal, error: error}
                    }))
                });
            } else {
                if (inputObj.target) {
                    this.setState(merge({
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
    }
}

export default TaskFormMixins
