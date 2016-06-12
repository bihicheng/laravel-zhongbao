/**
 *  所有的行为都返回Promise对象
 *
 * */

import moment from 'moment'
import {browserHistory} from 'react-router'

const emptyStr = ''
const maxDescLength = 255
const ErrorMessage =  {
    KIND_EMPTY: '请选择项目类型',
    DATE_FORMAT: '日期格式错误，请重新选择',
    TITLE_EMPTY: '项目名称不能为空',
    DESC_TOO_LONG: '项目描述过长，最大1204个字符',
    PHONE_EMPTY: '请输入手机号',
    PHONE_FORMAT: '手机号码格式不正确',
    CAPTCHA_EMPTY: '请输入验证码',
    CAPTCHA_REQUEST_ERROR: '获取验证码失败'
}

const Validator = {
    title: function (value) {
        if (value !== emptyStr) {
            return [true, emptyStr]
        } else {
            return [false, ErrorMessage.TITLE_EMPTY]
        }
    },
    endDate: function (value) {
        if (!value) {
            return [true, emptyStr]
        }

        let endDateStr = value.format('L')

        if (/^\d{4}\-\d{2}\-\d{2}$/.test(endDateStr)) {
            return [true, emptyStr]
        } else {
            return [false, ErrorMessage.DATE_FORMAT]
        }
    },
    kind: function (value) {
        if (value !== emptyStr) {
            return [true, emptyStr]
        } else {
            return [false, ErrorMessage.KIND_EMPTY]
        }
    },
    phone: function (value) {
        if (value === emptyStr) return [false, ErrorMessage.PHONE_EMPTY]

        if (/^1[0-9]{10}$/.test(value)) {
            return [true, emptyStr]
        } else {
            return [false, ErrorMessage.PHONE_FORMAT]
        }
    },
    captcha: function (value) {
        if (value !== emptyStr) {
            return [true, emptyStr]
        } else {
            return [false, ErrorMessage.CAPTCHA_EMPTY]
        }
    },
    desc: function (value) {
        if (value !== emptyStr) {
            if (value.length > maxDescLength) {
                return [false, ErrorMessage.DESC_TOO_LONG]
            } else {
                return [true, emptyStr]
            }
        } else {
            return [true, emptyStr]
        }
    }
}

export const submitTaskForm = function() {
    let isOk = true
    let state = this.state
    let stateObj = {}

    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            let validator = Validator[key] 
            let value = state[key]['value']

            if (validator) {
                let [result, error] = validator(value)

                if (!result) {
                    isOk = false
                    stateObj[key] = {value: value, error: error}
                }
            }
        }
    }

    this.setState(Object.assign({}, this.state, stateObj))

    if (!isOk) return

    stateObj.submitLoading = true
    $.ajax({
        url: '/api/v1/tasks',
        type: 'POST',
        data: {
            title: this.state.title.value,
            kind: this.state.kind.value,
            deadline_at: this.state.endDate.value.format('YYYY-MM-DD hh:mm:ss'),
            phone: this.state.phone.value,
            captcha: this.state.captcha.value,
            desc: this.state.desc.value
        }
    }).then((response) => {
        stateObj.submitLoading = false
        if (response.status === 0) {
            let taskId = response.task_id
            const path = `/tasks/{$taskId}/edit`
            browserHistory.push(path)
        } else if (response.status === 3) {
            stateObj.submitError = response.msg
            this.setState(Object.assign({}, this.state, stateObj))
        } else {
            stateObj.submitError = '提交错误: (' + response.error + ')'
            this.setState(Object.assign({}, this.state, stateObj))
        }
    }, (error) => {
        stateObj.submitLoading = false
        stateObj.submitError = '服务器错误: (' + error + ')' 
        this.setState(Object.assign({}, this.state, stateObj))
    })

}

export const titleOnBlur = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const title = inputEvent.target.value
        let [result, error] = Validator.title(title) 

        if (result) {
            resolve(title, error)
        } else {
            reject(error)
        }
    })
}

export const kindOnChange = (kind) => {
    return new Promise((resolve, reject) => {
        let [result, error] = Validator.kind(kind)

        if (result) {
            resolve(kind, error)
        } else {
            reject(error)
        }
    })
}

export const endDateOnChange = (endDate) => {
    return new Promise((resolve, reject) => {
        let [result, error] = Validator.endDate(endDate)

        if (result) {
            resolve(endDate, error)
        } else {
            reject(error)
        }
    })
}

export const descOnChange = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const desc = inputEvent.target.value
        let [result, error] = Validator.desc(desc)

        if (result) {
            resolve(desc, error)
        } else {
            reject(error)
        }
    })
}

export const phoneOnBlur = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const phone = inputEvent.target.value
        let [result, error] = Validator.phone(phone)

        if (result) {
            resolve(phone, error)
        } else {
            reject(error)
        }
    })
}

export const captchaOnBlur = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const captcha = inputEvent.target.value
        let [result, error] = Validator.captcha(captcha)

        if (result) {
            resolve(captcha, error)
        } else {
            reject(error)
        }
    })
}

export const getCaptcha = (phone) => {
    return new Promise((resolve, reject) => {
        if (phone === emptyStr) {
            reject(ErrorMessage.PHONE_EMPTY)
        } else {
            $.post('/api/v1/captcha/' + phone).then(
                (response) => {
                    if (response.status === 0) {
                        resolve(response)
                    } else {
                        reject(ErrorMessage.CAPTCHA_REQUEST_ERROR + '(' + response.error + ')')
                    }
                },
                (error) => {
                    reject(ErrorMessage.CAPTCHA_REQUEST_ERROR)
                }
            )   
        }
    })
}
