import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'

const Modal = (props) => (
  <ReactModal
    isOpen={props.isOpen}
    onRequestClose={props.onClose}
    appElement={document.getElementById('app')}
    contentLabel={props.label}
    closeTimeoutMS={200}
    className={props.className}>

    <p className='modal__body'>{props.body}</p>
    <div className='modal__options'>
      <button className='button button--secondary' onClick={props.onConfirm}>{props.confirmText}</button>
      <button className='button' onClick={props.onClose}>{props.cancelText}</button>
    </div>
  </ReactModal>
)

Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired
}

export default Modal
