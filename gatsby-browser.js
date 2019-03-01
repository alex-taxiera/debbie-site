import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import './node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

import 'styles/global.scss'

export const wrapRootElement = ({ element }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHA_KEY}>
      {element}
    </GoogleReCaptchaProvider>
  )
}
