import React, { Component } from 'react'
import propTypes from 'prop-types'

import './index.css'

class StyledInput extends Component {
  static propTypes = {
    type: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    onChange: propTypes.func,
    isValid: propTypes.func,
    errorMessage: propTypes.string,
    wrapperStyle: propTypes.object,
    inputStyle: propTypes.object,
    color: propTypes.string,
    accent: propTypes.string,
    errorColor: propTypes.string,
    isRequired: propTypes.bool
  }

  static defaultProps = {
    errorMessage: 'error',
    color: '#999',
    accent: '#21CABA',
    errorColor: 'red',
    isRequired: false,
    wrapperStyle: {},
    inputStyle: {}
  }

  state = {
    focused: false,
    error: null,
    value: ''
  }

  onChange = (event) => {
    const {
      onChange,
      isValid,
      errorMessage
    } = this.props

    const value = event.target.value
    const state = { value }
    if (isValid && !isValid(value)) {
      state.error = errorMessage
    } else {
      state.error = ''
    }
    onChange && onChange(state)
    this.setState(state)
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onBlur = () => {
    const {
      isRequired
    } = this.props

    const {
      value
    } = this.state

    const state = { focused: false }
    if (!value && isRequired) {
      state.error = 'this is a required field'
    }
    this.setState(state)
  }

  render = () => {
    const {
      type,
      label,
      color,
      accent,
      errorColor,
      isRequired,
      inputStyle,
      wrapperStyle
    } = this.props

    const {
      focused,
      error,
      value
    } = this.state

    return (
      <div className='styled-input-wrapper' style={{ ...wrapperStyle, ...(!error ? { paddingBottom: '1.2em' } : null) }}>
        <div className='styled-input'>
          {type === 'textarea'
            ? (
              <textarea
                className='box'
                style={inputStyle}
                value={value}
                required={isRequired}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            ) : (
              <input
                className='box'
                style={inputStyle}
                type={type}
                value={value}
                required={isRequired}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            )
          }
          <span
            className={'line' + (focused ? ' focused' : null)}
            style={error ? { background: errorColor } : { background: accent }}
          />
          <label
            style={{
              color,
              ...(value ? {
                color: accent,
                fontSize: '0.75em',
                top: '-1.25rem',
                left: '1em',
                WebkitTransition: 'all 0.125s ease',
                transition: 'all 0.125s ease'
              } : null),
              ...(error ? { color: errorColor } : null)
            }}
          >
            {label}
          </label>
        </div>
        <div
          className='error'
          style={{ color: errorColor, ...(!error ? { display: 'none' } : null) }}
        >
          {error || null}
        </div>
      </div>
    )
  }
}

export default StyledInput
