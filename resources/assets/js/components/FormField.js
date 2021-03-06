import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import DropDown from './DropDown'
import moment from 'moment'

// 日历汉化
moment.locale('zh-cn')
// 截止日期最小为当前日期的后两天
export const minDateStart = 2

const ErrorWhiteList = ['loading', 'checkmark']

class Validator extends Component {
    render() {
        if (this.props.error === 'loading') {
            return (
                <a className="ui active small inline loader"></a>
            )
        } else if (this.props.error === 'checkmark') {
            return (
                <i className="ui mall inline checkmark icon orange"></i>
            )
        } else if (this.props.error) {
            let errorClassName = `ui ${this.props.point || 'left'} pointing red basic label`

            return (
                <div className={errorClassName}>
                    {this.props.error}
                </div>
            )
        } else {
            return (<i></i>)
        }
    }
}

class FieldItem extends Component {
    render() {
        const {wide, error, className} = this.props
        let initClassName = [wide, 'wide column inline field']
        if (className) {
            initClassName.push(className)
        }

        let itemClassName = initClassName.join(' ')
        if (error && !ErrorWhiteList.includes(error)) {
            itemClassName += ' error'
        }

        return (
            <div className={itemClassName} >
                {this.props.children}
            </div>
        )
    }
}

const mergeProps = (validateAction=[], layout) => {
    let childProps = {}

    validateAction.forEach((action) => {
        childProps[action.type] = action.handler
    })

    return React.cloneElement(layout, childProps)
}

export class FormTextField extends Component {
    render() {
        const {label, name, value, validateAction, error, readonly, ...attrs} = this.props
        let inputLayout = ''
        let wide = 'eight'

        if (readonly) {
            wide = 'four'
            inputLayout = <input type="text" name={name} value={value || ''} className="ui disabled input" readOnly />
        } else {
            inputLayout = mergeProps(validateAction, <input type="text" name={name} value={value || ''} />)
        }

        return (
            <div className="ui grid stackable">
                <div className="two wide column task-form-label">
                    <label>{label}</label>
                </div>
                <FieldItem wide={wide} error={error} >
                    {inputLayout}
                    <Validator error={error} />
                </FieldItem>
            </div>
        )
    }
}

export class FormTextAreaField extends Component {
    render() {
        const {label, name, value, validateAction, error, ...attrs} = this.props
        const textAreaLayout = mergeProps(validateAction, <textarea name={name} value={value||''} ></textarea>)

        return (
            <div className="ui grid stackable">
                <div className="two wide column task-form-label">
                    <label>{label}</label>
                </div>
                <FieldItem wide="eight" error={error}>
                    {textAreaLayout}
                    <Validator error={error} point="top"/>
                </FieldItem>
            </div>
        )
    }
}

require('react-datepicker/dist/react-datepicker.css')
export class FormDatePicker extends Component {
    render() {
        const {label, value, validateAction, error, ...attrs} = this.props
        const datePickerLayout = mergeProps(validateAction,
                <DatePicker selected={value}
                        dateFormat="YYYY-MM-DD"
                        minDate={moment().add(minDateStart, 'days')}
                        local="zh-cn"
                        {...attrs} />)

        return (
            <div className="ui grid stackable">
                <div className="two wide column task-form-label">
                    <label>{label}</label>
                </div>
                <FieldItem wide="ten" error={error}>
                    {datePickerLayout}
                    <button className="ui icon button task-form-calendar-icon">
                        <i className="calendar icon"></i>
                    </button>
                    <Validator error={error} />
                </FieldItem>
            </div>
        )
    }
}

export class FormDropDown extends Component {
    render() {
        const {label, defaultText, validateAction, options, error, ...attrs} = this.props
        const dropDownLayout = mergeProps(validateAction,
                        <DropDown defaultText={defaultText}
                                  options={options}
                                  {...attrs} />)

        return (
            <div className="ui grid stackable">
                <div className="two wide column task-form-label">
                    <label>{label}</label>
                </div>
                <FieldItem wide="eight" error={error}>
                    {dropDownLayout}
                    <Validator error={error} />
                </FieldItem>
            </div>
        )
    }
}

class PhoneValidatorSender extends Component {
    render() {
        let remaining = this.props.remaining;

        if (remaining === 0) {
            let label = '获取验证码'
            return (
                <div className="ui basic button" onClick={this.props.getCaptcha}>{label}</div>
            )
        } else {
            let label = remaining + 's可重新发送'
            return (
                <div className="ui basic button">{label}</div>
            )
        }
    }
}

export class FormPhoneValidator extends Component {
    render() {
        const {label, value, name, validateAction, error, remaining, ...attrs} = this.props
        const phoneLayout = mergeProps(validateAction, <input type="text" name={name} value={value||''} />)

        return (
            <div className="ui grid stackable">
                <div className="two wide column task-form-label">
                    <label>{label}</label>
                </div>
                <FieldItem wide="eight" error={error} className="ui right inline field input">
                    {phoneLayout}
                    <PhoneValidatorSender remaining={remaining} getCaptcha={this.props.getCaptcha}/>
                    <Validator error={error} />
                </FieldItem>
            </div>
        )
    }
}
