import React, {Component} from 'react'

// Using semantic dropdown ui

class DropDown extends Component {
    componentDidMount() {
        let self = this
        let node = self.refs.dropdownNode
        $(node).dropdown({
            action: 'hide',
            onChange: (value, text, $selectedItem) => {
                self.props.onChange(value, text, $selectedItem)
            }
        })
    }

    componentDidUpdate() {
        let node = this.refs.dropdownNode
        $(node).dropdown('set selected', this.props.value)
    }

    render() {
        const {name, defaultText, options, value} = this.props

        return (
            <div className="ui selection dropdown" ref="dropdownNode">
                <input type="hidden" name={name} value={value}/>
                <i className="dropdown icon"></i>
                <div className="default text">{defaultText}</div>
                <div className="menu">
                {
                    options.map((item, i) => {
                        return <div className="item" key={i} data-value={item.value}>{item.name}</div>
                    })
                }
                </div>
            </div>
        )
    }
}

export default DropDown

