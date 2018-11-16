import React, { Component } from 'react'
import propTypes from 'prop-types'
import ReCaptcha from 'react-recaptcha'

import { sendEmail } from '../../api'
import Spinner from '../spinner'
import StyledInput from '../styled-input'

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

    let [
      email,
      message,
      firstName,
      lastName
    ] = Object.values(fields).map(({ value }) => value.trim())

    const canSubmit = token && !fieldErrors && !emailSent

    if (canSubmit) {
      this.setState({ isLoading: true })

      const contactEmail = {
        to,
        subject: 'Contact Form',
        text: `${firstName} ${lastName} says...\n\n${message}\n\nemail: ${email}`,
        confirmationEmail: {
          to: email,
          subject: 'Your Message was Received',
          text: `Thank You For Contacting Debbie Chen!\n\nHere was your message:\n"${message}"`
        }
      }

      sendEmail({ ...contactEmail, token })
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
        <div className='form'>
          <div className='double-input'>
            <StyledInput
              label='first name'
              type='text'
              isRequired
              isValid={(value) => value.trim()}
              erroMessage='this is a required field'
              errorColor={errorColor}
              accent={accent}
              onChange={(state) => this.handleChange('firstName', state)}
            />
            <StyledInput
              label='last name'
              type='text'
              isRequired
              isValid={(value) => value.trim()}
              erroMessage='this is a required field'
              errorColor={errorColor}
              accent={accent}
              onChange={(state) => this.handleChange('lastName', state)}
            />
          </div>
          <StyledInput
            label='email'
            type='text'
            isRequired
            // eslint-disable-next-line no-control-regex
            isValid={(value) => /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value)}
            errorMessage='please enter a valid email'
            errorColor={errorColor}
            accent={accent}
            onChange={(state) => this.handleChange('email', state)}
          />
          <StyledInput
            label='message'
            type='textarea'
            isRequired
            isValid={(value) => value.trim()}
            errorMessage='this is a required field'
            errorColor={errorColor}
            accent={accent}
            onChange={(state) => this.handleChange('message', state)}
          />
        </div>
        <div className='captcha'>
          <ReCaptcha
            sitekey={CAPTCHA_KEY}
            render='explicit'
            verifyCallback={(token) => this.setState({ token })}
          />
        </div>
        <div style={{ height: '1em', fontSize: '0.8em', color: errorColor }}>
          {error ? error.message : null}
        </div>
        <div
          className={'submit-btn padded box' + (!canSubmit ? ' disabled' : '')}
          onClick={(canSubmit ? this.handleSubmit : () => {})}
        >
          send
        </div>
      </div>
    )
  }
}

export default ContactForm
