import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import DropDown from './DropDown'

export const FormTextField = ({label, placeholder, value, onChange}) => (
    <div className="row">
        <div className="two wide column right aligned">
            <label>{label}</label>
        </div>
        <div className="four wide column">
            <input type="text" 
                   placeholder={placeholder} 
            />
        </div>
    </div>
)

export const FormTextAreaField = ({rows, label, value, actions}) => (
    <div className="row">
        <div className="two wide column right aligned">
            <label>{label}</label>
        </div>
        <div className="eight wide column">
            <textarea rows={rows} 
                      value={value} >
            </textarea>
        </div>
    </div>
)

require('react-datepicker/dist/react-datepicker.css')
export const FormDatePicker = ({label, value, actions}) => (
    <div className="row">
        <div className="two wide column right aligned">
            <label>{label}</label>
        </div>
        <div className="eight wide column">
            <DatePicker selected={value}
                        onChange={actions ? actions.handleChange : function(){}} />
        </div>
    </div>
)


export const FormDropDown = ({label, value, options}) => (
    <div className="row">
        <div className="two wide column right aligned">
            <label>{label}</label>
        </div>
        <div className="eight wide column">
            <DropDown defaultText={value} options={options} />
        </div>
    </div>
)

export class FormPhoneValidator = ({label, value, options}) => (
    <div className="row">
        <div className="two wide column right aligned">
            <label>{label}</label>
        </div>
        <div className="four wide column">
            <input type="text" placeholder={placeholder} />
        </div>
        <div className="three wide column">
        </div>
    </div>
)
