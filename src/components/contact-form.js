import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useMultiState from 'use-multi-state'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import StyledInput, { useForm } from 'styled-input'

import { sendEmail } from 'modules/aws'
import 'styles/contact-form.scss'

const formData = {
  firstName: {
    value: '',
    isRequired: true
  },
  lastName: {
    value: '',
    isRequired: true
  },
  email: {
    value: '',
    isRequired: true
  },
  message: {
    value: '',
    isRequired: true
  }
}

const ContactForm = ({
  title,
  to
}) => {
  const [
    [isLoading, setIsLoading],
    [error, setError],
    [buttonIsShaking, setButtonIsShaking],
    [token, setToken],
    [emailSent, setEmailSent]
  ] = useMultiState(false, null, false, null, false)

  const {
    values: {
      firstName,
      lastName,
      email,
      message
    },
    hasErrors,
    isComplete,
    handleChange,
    handleSubmit
  } = useForm(formData, async () => {
    if (canSubmit) {
      setIsLoading(true)

      try {
        await sendEmail({
          to,
          subject: 'Contact Form',
          text: `${firstName.value} ${lastName.value} says...\n\n${message.value}\n\nemail: ${email.value}`,
          token
        })
        setEmailSent(true)
        setError(null)
      } catch (error) {
        setEmailSent(false)
        setError(error)
      }
  
      setIsLoading(false)
      setToken(null)
    } else if (!buttonIsShaking) {
      const message = !hasErrors && !token ? noRecaptchaMessage : formIncompleteMessage
      setError(new Error(message))
      setButtonIsShaking(true)
      setTimeout(() => setButtonIsShaking(false), 1000)
    }
  })

  const { executeRecaptcha } = useGoogleReCaptcha()

  if (!token) {
    executeRecaptcha('contact').then(setToken).catch((error) => {
      setError(error)
      setToken(null)
    })
  }

  const canSubmit = token && !hasErrors && isComplete
  const noRecaptchaMessage = 'Please verify you are human'
  const formIncompleteMessage = 'Please complete the form'

  return (
    <div className="contact-form padded">
      {emailSent ? (
        <div className="success-message">
          Your message has been received. Thank you!
        </div>
      ) : (
        <form className="form-body" onSubmit={handleSubmit} disabled={!canSubmit}>
          <h1>{title}</h1>
          <div className="double-input">
            <StyledInput
              name="firstName"
              id="firstName"
              label="First Name"
              value={firstName.value}
              type="text"
              isRequired
              onChange={handleChange}
              accentColor="#5F2B1B"
              errorColor="#FA1E3F"
            />
            <StyledInput
              name="lastName"
              id="lastName"
              label="Last Name"
              value={lastName.value}
              type="text"
              isRequired
              onChange={handleChange}
              accentColor="#5F2B1B"
              errorColor="#FA1E3F"
            />
          </div>
          <StyledInput
            name="email"
            id="email"
            label="Email"
            value={email.value}
            type="text"
            isRequired
            // eslint-disable-next-line no-control-regex
            isValid={(value) => /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value)}
            errorMessage="Please enter a valid email"
            onChange={handleChange}
            accentColor="#5F2B1B"
            errorColor="#FA1E3F"
          />
          <StyledInput
            name="message"
            id="message"
            label="Message"
            value={message.value}
            type="textarea"
            isRequired
            onChange={handleChange}
            accentColor="#5F2B1B"
            errorColor="#FA1E3F"
          />
          <div className="form-error">
            {error ? error.message : null}
          </div>
          <button
            type="submit"
            className={'submit-btn box' + (buttonIsShaking ? ' shake' : '') + (!canSubmit ? ' disabled' : '')}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  )
}

ContactForm.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string.isRequired
}

ContactForm.defaultProps = {
  title: 'Contact Form'
}

export default ContactForm
