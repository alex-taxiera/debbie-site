import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'

import { fourPages } from './shapes'
import Menu from './components/menu'

import './index.css'

class App extends Component {
  state = {
    currentPage: {}
  }

  static propTypes = {
    title: propTypes.string.isRequired,
    pages: fourPages
  }

  componentWillMount () {
    const { pages } = this.props
    console.log(pages)
    this.setState({ currentPage: pages.page1 })
  }

  bringToTop () {
    const body = ReactDOM.findDOMNode(this.refs.body)
    if (window.pageYOffset > 120) {
      body.scrollIntoView()
    }
  }

  onMenuChange (pageKey) {
    const { pages } = this.props
    this.setState({ currentPage: pages[pageKey] })
    this.bringToTop()
  }

  render () {
    const { currentPage } = this.state
    const { title, pages } = this.props
    return (
      <div className='container'>
        <div className='title'>
          {title}
        </div>
        <div className='body' ref='body'>
          <Menu
            options={Object.keys(pages).map((key) => ({ key, value: pages[key].name }))}
            onChange={(pageKey) => this.onMenuChange(pageKey)}
          />
          <div className='content'>
            {currentPage.content}
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
