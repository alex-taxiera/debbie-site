import React from 'react'
import throttle from 'lodash.throttle'
import hoistStatics from 'hoist-non-react-statics'
import getDisplayName from 'enhancers/get-display-name'

function withScreenWidth (WrappedComponent) {
  class WithScreenWidth extends React.PureComponent {
    state = {
      screenWidth: null
    }

    componentWillMount () {
      this.setState({
        screenWidth: window.innerWidth
      })
      if (!this.onResize) {
        this.onResize = throttle(() => {
          this.setState({
            screenWidth: window.innerWidth
          })
        }, 16)
      }
    }

    componentDidMount () {
      window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.onResize)
    }

    render () {
      return <WrappedComponent {...this.props} screenWidth={this.state.screenWidth} />
    }
  }

  WithScreenWidth.displayName = `withScreenWidth(${getDisplayName(WrappedComponent)})`

  return hoistStatics(WithScreenWidth, WrappedComponent)
}

export default withScreenWidth
