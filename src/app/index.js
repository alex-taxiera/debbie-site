import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import SVG from 'react-inlinesvg'

import { fourPages } from './shapes'

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
    pages: fourPages
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
    console.log('render', this.state)
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
            <div className='title white box'>
              {title}
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
            contact me
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
                errorColor='blue'
              />
            </div>
          </PopUpModal>
        </div>
      </div>
    )
  }
}

export default App
