import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

import {
  Home,
  About,
  Resume,
  Sample
} from './pages'

import './index.css'

async function render () {
  const pages = {
    page1: {
      name: 'Home',
      content: Home
    },
    page2: {
      name: 'About',
      content: About
    },
    page3: {
      name: 'Resume',
      content: Resume
    },
    page4: {
      name: 'Sample',
      content: Sample
    }
  }
  ReactDOM.render(
    <App
      title='Debbie Chen'
      contact='debbiechen@umass.edu'
      pages={pages}
    />,
    document.getElementById('root')
  )
}

render()
