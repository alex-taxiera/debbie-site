import React, { Component } from 'react'
import propTypes from 'prop-types'
import ReCaptcha from 'react-recaptcha'

import { sendEmail } from '../../api'
import Spinner from '../spinner'
import StyledInput from './components/styled-input'

import './index.css'
import PopUpModal from '../pop-up-modal'

const CAPTCHA_KEY = '6LdWKnkUAAAAAEgpCXhzjRikK1luGxnZ8TyiUdpG'

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
    error: null,
    token: null,
    emailSent: false,
    fieldErrors: false,
    fields: {
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
      fields
    } = this.state

    return Object.values(fields).some((state) => state.error)
  }

  handleSubmit = () => {
    const {
      to
    } = this.props

    const {
      token,
      fieldErrors,
      emailSent,
      fields
    } = this.state

    const {
      email,
      message
    } = fields

    const canSubmit = token && !fieldErrors && !emailSent

    if (canSubmit) {
      this.setState({ isLoading: true })

      const toContact = {
        to,
        subject: 'Contact Form',
        text: `${email.value} says...\n\n${message.value}`
      }

      sendEmail({ ...toContact, token })
        .then((res) => this.setState({ isLoading: false, emailSent: true, error: null, token: null }))
        .catch((error) => this.setState({ isLoading: false, emailSent: false, error, token: null }))
    }
  }

  handleChange = (field, state) => {
    const {
      fields
    } = this.state

    const newState = { fields: { ...fields, [field]: state } }
    this.setState({
      ...newState,
      fieldErrors: Object.values(newState.fields).some((state) => state.error)
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
      error,
      token,
      emailSent,
      fieldErrors
    } = this.state

    const canSubmit = token && !fieldErrors && !emailSent

    return (
      <div className='contact-form'>
        <div className='title'>{title}</div>
        <PopUpModal className='idk-why-this-works' isOpen={isLoading}>
          <Spinner color={accent} />
        </PopUpModal>
        <div
          className='form'
          style={error ? null : { marginBottom: '1em' }}
        >
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
              verifyCallback={(token) => this.setState({ token })}
            />
          </div>
          <div
            className={'submit-btn padded box' + (!canSubmit ? ' disabled' : '')}
            onClick={(canSubmit ? this.handleSubmit : () => {})}
          >
            send
          </div>
        </div>
        {error ? (
          <div style={{ height: '1em', fontSize: '0.8em', color: errorColor }}>
            {error.message}
          </div>
        ) : null}
      </div>
    )
  }
}

export default ContactForm
