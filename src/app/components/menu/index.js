import React, { Component } from 'react'
import propTypes from 'prop-types'

class Menu extends Component {
  state = {
    selected: ''
  }

  static propTypes = {
    options: propTypes.arrayOf(propTypes.shape({
      key: propTypes.string.isRequired,
      value: propTypes.string.isRequired
    })).isRequired,
    onChange: propTypes.func,
    value: propTypes.string
  }

  static defaultProps = {
    onChange: () => null,
    value: ''
  }

  componentWillMount () {
    const { options } = this.props
    this.setState({ selected: options[0].key })
  }

  isSelected (key) {
    const { selected } = this.state
    const { value } = this.props
    return (value ? value === key : selected === key)
  }

  render () {
    const { options, onChange } = this.props
    return (
      <div className='menu'>
        {options.map(({ key, value }) => {
          return (
            <div
              key={key}
              className={'option' + (this.isSelected(key) ? ' selected' : '')}
              onClick={() => {
                this.setState({ selected: key })
                onChange && onChange(key)
              }}
            >
              {value}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Menu
