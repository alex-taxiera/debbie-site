import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import SVG from 'react-inlinesvg'

import { fivePages } from './shapes'

import Menu from './components/menu'
import PopUpModal from './components/pop-up-modal'
import ContactForm from './components/contact-form'
// import Spinner from './components/spinner'

import crossIcon from './assets/cross.svg'

import './index.css'

class App extends Component {
  state = {
    error: null,
    currentPage: {},
    contactFormIsOpen: false
  }

  static propTypes = {
    title: propTypes.string.isRequired,
    contact: propTypes.string,
    pages: fivePages
  }

  componentWillMount = () => {
    const { pages } = this.props
    this.setState({ currentPage: pages.page1 })
  }

  bringToTop = () => {
    const body = ReactDOM.findDOMNode(this.refs.body)
    if (window.pageYOffset > 120) {
      body.scrollIntoView()
    }
  }

  onMenuChange = (pageKey) => {
    const { pages } = this.props
    this.setState({ currentPage: pages[pageKey] })
    this.bringToTop()
  }

  render = () => {
    const {
      error,
      currentPage,
      contactFormIsOpen
    } = this.state

    const {
      title,
      pages,
      contact
    } = this.props

    if (error) {
      console.error('here is an error', error)
    }

    return (
      <div className='container'>
        <div className='header'>
          <div id='banner'>
            <div className='title white box' style={{ padding: '0.5em 1.2em' }}>
              {title}
              <div className='sub-title'>
                Bassoonist - Music Educator
              </div>
            </div>
          </div>
        </div>
        <div className='body box' ref='body'>
          <Menu
            options={Object.keys(pages).map((key) => ({ key, value: pages[key].name }))}
            onChange={this.onMenuChange}
          />
          <div className='content'>
            {currentPage.content}
          </div>
        </div>
        <div className='footer'>
          <span
            className='contact-btn'
            onClick={() => this.setState({ contactFormIsOpen: true })}
          >
            Contact Me
          </span>
          <PopUpModal
            isOpen={contactFormIsOpen}
            onRequestClose={() => this.setState({ contactFormIsOpen: false })}
            className='modal'
          >
            <div className='white box padded' style={{ maxWidth: 500, margin: 'auto' }}>
              <div className='modal-header'>
                <div
                  className='modal-close'
                  onClick={() => this.setState({ contactFormIsOpen: false })}
                >
                  <SVG
                    preloader={(
                      <div>x</div>
                    )}
                    src={crossIcon}
                    className='cross-icon'
                    alt='X'
                  />
                </div>
              </div>
              <ContactForm
                title='Contact Me'
                to={contact}
                accent='#874E4C'
                errorColor='#fa1e3f'
              />
            </div>
          </PopUpModal>
        </div>
      </div>
    )
  }
}

export default App
