import React, { Component } from 'react'
import propTypes from 'prop-types'

import './index.css'

class YoutubeIframe extends Component {
  state = {
    isLoading: true
  }

  static propTypes = {
    title: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
    onLoad: propTypes.func,
    preloader: propTypes.node
  }

  onLoad = () => {
    console.log('loaded')
    const {
      onLoad
    } = this.props
    onLoad && onLoad()
    this.setState({ isLoading: false })
  }

  render = () => {
    const {
      title,
      src,
      preloader
    } = this.props

    const {
      isLoading
    } = this.state

    return (
      <div>
        <div className='wrapper' style={isLoading ? null : { display: 'none' }}>
          <div className='preloader'>
            {isLoading ? preloader : null}
          </div>
        </div>
        <div className='wrapper' style={isLoading ? { display: 'none' } : null}>
          <iframe
            title={title}
            src={src}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            onLoad={this.onLoad}
          />
        </div>
      </div>
    )
  }
}

export default YoutubeIframe
