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
        $(node).dropdown('refresh')
    }

    render() {
        return (
            <div className="ui dropdown" ref="dropdownNode">
                <input type="hidden" name={this.props.name} />
                <i className="dropdown icon"></i>
                <div className="default text">{this.props.defaultText}</div>
                <div className="menu">
                {
                    this.props.options.map((item) => {
                        return <div className="item" data-value={item.value}>{item.name}</div>
                    })
                }
                </div>
            </div>
        )
    }
}

export default DropDown

