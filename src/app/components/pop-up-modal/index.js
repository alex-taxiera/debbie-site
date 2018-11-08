import React, { Component } from 'react'
import propTypes from 'prop-types'
import Modal from 'react-modal'

import './index.css'

class PopUpModal extends Component {
  static propTypes = {
    isOpen: propTypes.bool,
    onRequestClose: propTypes.func,
    className: propTypes.string,
    children: propTypes.oneOfType([propTypes.node, propTypes.arrayOf(propTypes.node)]),
    childrenWidth: propTypes.oneOfType([propTypes.number, propTypes.string])
  }

  static defaultProps = {
    isOpen: false,
    onRequestClose: () => null,
    className: ''
  }

  render () {
    const {
      isOpen,
      onRequestClose,
      className,
      children,
      childrenWidth
    } = this.props

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={className}
        style={{
          overlay: {
            background: null
          },
          content: {
            background: 'transparent',
            padding: 0,
            borderRadius: 0,
            border: 'none',
            display: 'table',
            position: 'absolute',
            height: '100%',
            width: '100%',
            maxWidth: '100%'
          }
        }}
      >
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <div className='children' style={{ width: childrenWidth, marginLeft: 'auto', marginRight: 'auto' }}>
            {children}
          </div>
        </div>
      </Modal>
    )
  }
}

Modal.setAppElement('body')

export default PopUpModal
