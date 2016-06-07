/**
 *  所有的行为都返回Promise对象
 *
 * */

import moment from 'moment'

const emptyStr = ''
const ErrorMessage =  {
    KIND_EMPTY: '请选择项目类型',
    DATE_FORMAT: '日期格式错误，请重新选择',
    TITLE_EMPTY: '项目名称不能为空',
    DESC_TOO_LONG: '项目描述过长，最大1204个字符',
    PHONE_EMPTY: '请输入手机号',
    PHONE_FORMAT: '手机号码格式不正确',
    CAPTCHA_EMPTY: '请输入验证码'
}

export const taskFormSubmit = () => {

}

export const titleOnBlur = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const title = inputEvent.target.value
        if (title === emptyStr) {
            reject(ErrorMessage.TITLE_EMPTY)
        } else {
            resolve(title, emptyStr)
        }
    })
}

export const kindOnChange = (kind) => {
    return new Promise((resolve, reject) => {
        if (kind === emptyStr) {
            reject(ErrorMessage.KIND_EMPTY)
        } else {
            resolve(kind, emptyStr)
        }
    })
}

export const endDateOnChange = (endDate) => {
    return new Promise((resolve, reject) => {
        let endDateStr = endDate.format('L')

        if (/^\d{4}\-\d{2}\-\d{2}$/.test(endDateStr)) {
            resolve(endDate, emptyStr)
        } else {
            reject(ErrorMessage.DATE_FORMAT)
        }
    })
}

const maxDescLength = 1024
export const descOnChange = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const desc = inputEvent.target.value
        if (desc !== emptyStr) {
            if (desc.length > maxDescLength) {
                reject(ErrorMessage.DESC_TOO_LONG)
            } else {
                resolve(desc, emptyStr)
            }
        } else {
            resolve(desc, emptyStr)
        }
    })
}

export const phoneOnBlur = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const phone = inputEvent.target.value
        if (phone === emptyStr) {
            reject(ErrorMessage.PHONE_EMPTY)
        }
        
        if (/^1[0-9]{10}$/.test(phone)) {
            resolve(phone, emptyStr)
        } else {
            reject(ErrorMessage.PHONE_FORMAT)
        }
    })
}

export const captchaOnBlur = (inputEvent) => {
    return new Promise((resolve, reject) => {
        const captcha = inputEvent.target.value

        if (captcha === emptyStr) {
            reject(ErrorMessage.CAPTCHA_EMPTY)
        }
    })
}
