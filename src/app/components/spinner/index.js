import React, { Component } from 'react'
import propTypes from 'prop-types'

import './index.css'

class Spinner extends Component {
  static propTypes = {
    color: propTypes.string,
    style: propTypes.object
  }

  static defaultProps = {
    color: '#000',
    style: {}
  }

  render = () => {
    const {
      color,
      style
    } = this.props

    return (
      <div className='spinner-container' style={{ color, ...style }}>
        <div className='loader'>
          Loading...
        </div>
      </div>
    )
  }
}

export default Spinner
