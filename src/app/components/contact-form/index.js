import React, { Component } from 'react'
import propTypes from 'prop-types'
import ReCaptcha from 'react-recaptcha'

import Spinner from '../spinner'
import StyledInput from './components/styled-input'

import './index.css'

class ContactForm extends Component {
  state = {
    isLoading: false,
    error: null,
    captcha: null,
    sent: false,
    email: '',
    subject: '',
    body: ''
  }

  static propTypes = {
    title: propTypes.string,
    to: propTypes.string.isRequired
  }

  handleSubmit = () => {
    return null
  }

  render = () => {
    const {
      title,
      to
    } = this.props

    const {
      isLoading,
      error,
      captcha,
      sent,
      value
    } = this.state

    return (
      <div className='contact-form'>
        <div className='title'>{title}</div>
        {isLoading
          ? (<Spinner color='#21CABA' />)
          : (
            <div className='form'>
              <StyledInput
                type='text'
                label='name'
                isValid={(value) => value === 'abc'}
                errorMessage='must be "abc"'
              />
              <div className='captcha'>
                <ReCaptcha
                  sitekey='6LdWKnkUAAAAAEgpCXhzjRikK1luGxnZ8TyiUdpG'
                  render='explicit'
                  verifyCallback={(token) => this.setState({ captcha: token })}
                />
              </div>
              <button
                disabled={!captcha || sent}
                onClick={this.handleSubmit}
              >
                send
              </button>
            </div>
          )
        }
        {error}
      </div>
    )
  }
}

export default ContactForm
