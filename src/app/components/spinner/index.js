import React, { Component } from 'react'
import propTypes from 'prop-types'

import './index.css'

class Spinner extends Component {
  static propTypes = {
    color: propTypes.string
  }

  static defaultProps = {
    color: '#000'
  }

  render = () => {
    const {
      color
    } = this.props

    return (
      <div
        className='loader'
        style={{ color }}
      >
        Loading...
      </div>
    )
  }
}

export default Spinner
