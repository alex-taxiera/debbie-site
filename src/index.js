import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

import {
  home,
  about,
  resume,
  sample
} from './pages'

import './index.css'

async function render () {
  const pages = {
    page1: {
      name: 'Home',
      content: home()
    },
    page2: {
      name: 'About',
      content: about()
    },
    page3: {
      name: 'Resume',
      content: resume()
    },
    page4: {
      name: 'Sample',
      content: sample()
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
