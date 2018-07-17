import React from 'react'
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

export default Modal
