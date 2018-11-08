import React, { Component } from 'react'
import propTypes from 'prop-types'
import ReCaptcha from 'react-recaptcha'

import Spinner from '../spinner'
import StyledInput from './components/styled-input'

import './index.css'
import PopUpModal from '../pop-up-modal'

console.log('process', process.env)

const IN_PRODUCTION = process.env.NODE_ENV === 'production'
console.log('in prod', IN_PRODUCTION)
const CAPTCHA_KEY = process.env[(!IN_PRODUCTION ? 'REACT_APP_' : '') + 'CAPTCHA_KEY']
console.log('attempt at key', process.env.CAPTCHA_KEY)
console.log('actual key', CAPTCHA_KEY)

class ContactForm extends Component {
  static propTypes = {
    title: propTypes.string,
    to: propTypes.string.isRequired,
    accent: propTypes.string,
    color: propTypes.string,
    errorColor: propTypes.string
  }

  state = {
    isLoading: false,
    captchaLoaded: false,
    error: null,
    captcha: null,
    sent: false,
    fieldErrors: false,
    data: {
      email: {
        value: '',
        error: null
      },
      message: {
        value: '',
        error: null
      }
    }
  }

  hasErrors = () => {
    const {
      data
    } = this.state

    return Object.values(data).some((state) => state.error)
  }

  handleSubmit = () => {
    const {
      to
    } = this.props

    const {
      captcha,
      fieldErrors,
      sent,
      data
    } = this.state

    this.setState({ isLoading: true })

    if (!captcha || fieldErrors || sent) {
      this.setState({ isLoading: false })
    } else {
      fetch('/mailgun/contact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          contacter: data.email.value,
          to,
          text: data.message.value
        })
      })
        .then((res) => this.setState({ isLoading: false, sent: true }))
        .catch((res) => this.setState({ isLoading: false, sent: true, error: res.error.message }))
    }
  }

  handleChange = (field, state) => {
    const {
      data
    } = this.state

    const newState = { data: { ...data, [field]: state } }
    this.setState({
      ...newState,
      fieldErrors: Object.values(newState.data).some((state) => state.error)
    })
  }

  render = () => {
    const {
      title,
      accent,
      errorColor
    } = this.props

    const {
      isLoading,
      captchaLoaded,
      error,
      captcha,
      sent,
      fieldErrors
    } = this.state

    const submitEnabled = captcha && !fieldErrors && !sent

    return (
      <div className='contact-form'>
        <div className='title'>{title}</div>
        <PopUpModal className='idk-why-this-works' isOpen={isLoading || !captchaLoaded}>
          <Spinner color={accent} />
        </PopUpModal>
        <div className='form'>
          <StyledInput
            label='email'
            type='email'
            // eslint-disable-next-line no-control-regex
            isValid={(value) => /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value)}
            errorMessage='please enter a valid email'
            errorColor={errorColor}
            accent={accent}
            isRequired
            onChange={(state) => this.handleChange('email', state)}
          />
          <StyledInput
            label='message'
            type='textarea'
            errorColor={errorColor}
            accent={accent}
            isRequired
            onChange={(state) => this.handleChange('message', state)}
          />
          <div className='captcha'>
            <ReCaptcha
              sitekey={CAPTCHA_KEY}
              render='explicit'
              onloadCallback={() => this.setState({ captchaLoaded: true })}
              verifyCallback={(token) => this.setState({ captcha: token })}
            />
          </div>
          <div
            className={'submit-btn padded box' + (!submitEnabled ? ' disabled' : '')}
            onClick={(submitEnabled ? this.handleSubmit : () => {})}
          >
            send
          </div>
        </div>
        {error}
      </div>
    )
  }
}

export default ContactForm
