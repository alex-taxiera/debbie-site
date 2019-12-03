import React from 'react'
import propTypes from 'prop-types'
import Modal from 'react-modal'

import 'styles/pop-up-modal.scss'

const PopUpModal = ({
  isOpen,
  onRequestClose,
  className,
  children
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={className}
    overlayClassName={className}
    style={{
      overlay: {
        background: null
      }
    }}
    closeTimeoutMS={180}
  >
    <>{children}</>
  </Modal>
)

PopUpModal.propTypes = {
  isOpen: propTypes.bool,
  onRequestClose: propTypes.func,
  className: propTypes.string,
  children: propTypes.oneOfType([propTypes.node, propTypes.arrayOf(propTypes.node)])
}

PopUpModal.defaultProps = {
  isOpen: false,
  onRequestClose: () => null,
  className: ''
}

Modal.setAppElement('body')

export default PopUpModal
