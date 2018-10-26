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

ReactDOM.render(
  <App
    title='Debbie Chen'
    pages={{
      page1: {
        name: 'home',
        content: home()
      },
      page2: {
        name: 'about',
        content: about()
      },
      page3: {
        name: 'resume',
        content: resume()
      },
      page4: {
        name: 'sample',
        content: sample()
      }
    }}
  />,
  document.getElementById('root')
)
