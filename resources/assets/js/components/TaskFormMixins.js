import * as FormActions  from  '../actions/formAction'
import * as ActionTypes from '../actions/actionTypes'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const TaskFormMixins = {
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
    }
}

export default TaskFormMixins
