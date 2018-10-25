import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'

import './index.css'

import Menu from './components/menu'

class App extends Component {
  state = {
    currentPage: 'home'
  }

  static propTypes = {
    title: propTypes.string.isRequired,
    pages: propTypes.arrayOf(propTypes.string)
  }

  static defaultProps = {
    pages: [
      'home',
      'about',
      'resume',
      'sample'
    ]
  }

  componentWillMount () {
    const { pages } = this.props
    this.setState({ currentPage: pages[0] })
  }

  bringToTop () {
    const body = ReactDOM.findDOMNode(this.refs.body)
    if (window.pageYOffset > 120) {
      body.scrollIntoView()
    }
  }

  onMenuChange (page) {
    this.setState({ currentPage: page })
    this.bringToTop()
  }

  renderContent () {
    const { currentPage } = this.state
    switch (currentPage) {
      case 'home': return 'home'
      default: return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget convallis est. Aenean gravida massa vitae velit gravida, eu suscipit sem egestas. Maecenas aliquam ante ac auctor sagittis. Nunc luctus, arcu ut tincidunt facilisis, enim ante viverra magna, a finibus velit diam et dolor. Proin dolor odio, ullamcorper eget pretium a, placerat ut lorem. Aenean pulvinar enim nec est rhoncus dictum. Nam eu orci eget quam tempus vehicula ac in nibh. Vestibulum varius cursus nulla. Nulla vestibulum nulla aliquet, vulputate turpis nec, maximus purus. Aliquam viverra maximus lorem sed varius. Donec ultrices justo magna, cursus ornare tortor commodo at. In fermentum bibendum libero, eu blandit turpis. Suspendisse quis justo laoreet, aliquam nunc ac, sagittis leo. In non urna hendrerit, mattis orci ac, scelerisque urna. In hendrerit sem ex, ac semper magna dapibus vitae. Curabitur non viverra purus.

      Ut et consequat nibh, volutpat gravida nunc. Etiam et commodo ante. Quisque ut ultrices metus. Nam sed viverra enim. Cras dictum pulvinar arcu a aliquet. Integer nec consectetur orci. Nullam eu quam ligula. Donec a dui eu ante congue feugiat. Cras nec quam vitae turpis posuere vehicula. Sed auctor fringilla purus ac malesuada.
      
      Phasellus lacus mauris, placerat nec metus eget, mattis egestas nunc. Cras eu rutrum ex, a ultricies lectus. In tincidunt mauris sed ligula cursus, a lobortis dui venenatis. Integer rhoncus lorem scelerisque dui luctus, auctor fermentum libero feugiat. Fusce at auctor erat. Vivamus id ligula in quam egestas placerat vel quis felis. Mauris bibendum ut magna vel laoreet. Pellentesque tincidunt fringilla ultrices. Quisque iaculis a libero in congue. Sed tempus purus sed magna ornare eleifend. In vel purus risus. Duis faucibus ligula ligula, a dapibus lorem hendrerit vel. Integer suscipit odio eget imperdiet faucibus. Ut placerat mollis porta.
      
      Sed malesuada viverra ante at accumsan. Phasellus laoreet ante semper risus fermentum pretium. Vestibulum et imperdiet ipsum. Etiam id aliquam lorem, sit amet blandit metus. Mauris malesuada sit amet ipsum elementum lacinia. In hac habitasse platea dictumst. Donec laoreet vitae lacus sed faucibus. Cras vulputate at eros et convallis. In facilisis laoreet quam sit amet iaculis. Integer bibendum, ex quis ultricies interdum, massa est tincidunt odio, nec rutrum neque ipsum at urna. Quisque non mattis purus. Quisque dictum mi sit amet sapien varius eleifend. Donec consectetur ex sed vehicula faucibus. Donec non nunc sodales augue pulvinar molestie gravida at lacus. Nunc placerat dolor a erat tincidunt egestas. Suspendisse rhoncus feugiat lorem ac aliquet.
      
      Suspendisse laoreet urna quis consectetur laoreet. Aenean varius neque at magna viverra feugiat. Vestibulum blandit at enim in sodales. Proin id ultrices orci. Ut ut egestas turpis. Suspendisse at mattis diam, a aliquam tortor. Vestibulum sodales sed neque in gravida. Donec tristique nisl at urna euismod facilisis.`
    }
  }

  render () {
    const { title, pages } = this.props
    return (
      <div className='container'>
        <div className='title'>
          {title}
        </div>
        <div className='body' ref='body'>
          <Menu
            options={pages}
            onChange={(page) => this.onMenuChange(page)}
          />
          <div className='content'>
            {this.renderContent()}
          </div>
        </div>
        <div className='footer'>
          <a href='mailto:debbiechen@umass.edu'>contact me</a>
        </div>
      </div>
    )
  }
}

export default App
