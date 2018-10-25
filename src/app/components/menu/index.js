import React, { Component } from 'react'
import propTypes from 'prop-types'

import './index.css'

class Menu extends Component {
  state = {
    selected: ''
  }

  static propTypes = {
    options: propTypes.arrayOf(propTypes.string).isRequired,
    onChange: propTypes.func,
    value: propTypes.string
  }

  static defaultProps = {
    onChange: () => null,
    value: ''
  }

  componentWillMount () {
    const { options } = this.props
    this.setState({ selected: options[0] })
  }

  isSelected (option) {
    const { selected } = this.state
    const { value } = this.props
    return (value ? value === option : selected === option)
  }

  render () {
    const { options, onChange } = this.props
    return (
      <div className='menu'>
        {options.map((option, index) => {
          return (
            <div
              key={index}
              className={'option' + (this.isSelected(option) ? ' selected' : '')}
              onClick={() => {
                this.setState({ selected: option })
                onChange && onChange(option)
              }}
            >
              {option}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Menu
