import React, { Component } from 'react'
import propTypes from 'prop-types'
import ReCaptcha from 'react-recaptcha'

import { sendEmail } from '../../../api'
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
    message: null,
    badClick: false,
    token: null,
    emailSent: false,
    fieldErrors: true,
    fields: {
      firstName: {
        value: '',
        error: null
      },
      lastName: {
        value: '',
        error: null
      },
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

  componentWillMount = () => {
    const {
      accent
    } = this.props

    const [r, g, b] = Object.values(this.hexToRgb(accent)).map((color) => {
      color = color / 255
      if (color <= 0.03928) {
        return color / 12.92
      } else {
        return Math.pow(((color + 0.055) / 1.055), 2.4)
      }
    })

    this.setState({ accentIsDark: 0.2126 * r + 0.7152 * g + 0.0722 * b <= 0.179 })
  }

  hexToRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b
    })

    const [match, red, green, blue] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return match ? {
      r: parseInt(red, 16),
      g: parseInt(green, 16),
      b: parseInt(blue, 16)
    } : null
  }

  hasErrors = () => {
    const {
      fields
    } = this.state

    return Object.values(fields).some((state) => state.error)
  }

  onRecaptcha = (token) => {
    const {
      message
    } = this.state

    const newState = {
      token
    }

    if (token && message === 'please verify you are human') {
      newState.message = null
    }

    this.setState(newState)
  }

  onSubmit = () => {
    const {
      badClick,
      token,
      fieldErrors,
      emailSent
    } = this.state

    const canSubmit = token && !fieldErrors && !emailSent

    if (canSubmit) {
      this.setState({ message: null })
      this.handleSubmit()
    } else if (!badClick) {
      const message = !fieldErrors && !token ? 'please verify you are human' : 'please complete the form'
      this.setState({ message, badClick: true }, () => {
        const self = this
        setTimeout(() => self.setState({ badClick: false }), 1000)
      })
    }
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
        .catch((error) => this.setState({ isLoading: false, emailSent: false, error: error.message, token: null }))
    }
  }

  handleChange = (field, state) => {
    const {
      fields,
      message
    } = this.state

    const newState = { fields: { ...fields, [field]: state } }
    const fieldErrors = Object.values(newState.fields).some((state) => !state.value.trim() || state.error)
    if (!fieldErrors && message === 'please complete the form') {
      newState.message = null
    }
    this.setState({
      ...newState,
      fieldErrors
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
      fieldErrors,
      message,
      badClick,
      accentIsDark
    } = this.state

    const accentTextColor = accentIsDark ? 'white' : 'black'

    const canSubmit = token && !fieldErrors && !emailSent

    return emailSent
      ? (
        <div className='success-message'>
          Your message has been received. Thank you!
        </div>
      ) : (
        <div className='contact-form'>
          <div className='title'>{title}</div>
          <PopUpModal className='idk-why-this-works' isOpen={isLoading}>
            <Spinner color={accent} />
          </PopUpModal>
          <div className='form'>
            <div className='double-input'>
              <StyledInput
                label='First Name'
                type='text'
                isRequired
                errorColor={errorColor}
                accent={accent}
                onChange={(state) => this.handleChange('firstName', state)}
              />
              <StyledInput
                label='Last Name'
                type='text'
                isRequired
                errorColor={errorColor}
                accent={accent}
                onChange={(state) => this.handleChange('lastName', state)}
              />
            </div>
            <StyledInput
              label='Email'
              type='text'
              isRequired
              // eslint-disable-next-line no-control-regex
              isValid={(value) => /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value)}
              errorMessage='Please enter a valid email'
              errorColor={errorColor}
              accent={accent}
              onChange={(state) => this.handleChange('email', state)}
            />
            <StyledInput
              label='Message'
              type='textarea'
              isRequired
              errorColor={errorColor}
              accent={accent}
              onChange={(state) => this.handleChange('message', state)}
            />
          </div>
          <div className='captcha'>
            <ReCaptcha
              sitekey={CAPTCHA_KEY}
              render='explicit'
              verifyCallback={this.onRecaptcha}
            />
          </div>
          <div style={{ height: '1em', fontSize: '0.8em', color: errorColor }}>
            {error ? error.message : message || null}
          </div>
          <div
            style={{ backgroundColor: accent, color: accentTextColor }}
            className={'submit-btn box' + (!canSubmit ? ' disabled' : '') + (badClick ? ' shake' : '')}
            onClick={this.onSubmit}
          >
            Submit
          </div>
        </div>
      )
  }
}

export default ContactForm
