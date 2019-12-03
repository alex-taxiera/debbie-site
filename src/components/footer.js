import React, { useState } from 'react'

import PopUpModal from 'components/pop-up-modal'
import ContactForm from 'components/contact-form'
import CloseIcon from 'icons/x.svg'
import 'styles/footer.scss'

const Footer = () => {
  const [contactFormIsOpen, setContactFormOpen] = useState(false)
  return (
    <footer>
      <div className="page-wrapper">
        <span
          className="plain-link hover-decoration"
          onClick={() => setContactFormOpen(true)}
        >
          Contact Me
        </span>
        <PopUpModal
          className="contact-form-modal"
          isOpen={contactFormIsOpen}
          onRequestClose={() => setContactFormOpen(false)}
        >
          <div className="content box">
            <div
              className="close"
              onClick={() => setContactFormOpen(false)}
            >
              <CloseIcon />
            </div>
            <ContactForm
              title="Contact Me"
              to={process.env.CONTACT_EMAIL}
            />
          </div>
        </PopUpModal>
      </div>
    </footer>
  )
}

export default Footer
