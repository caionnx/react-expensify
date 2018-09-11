import React from 'react'
import PropTypes from 'prop-types'

export const AddStandardCategories = ({ buttonAction }) => (
  <div className='list-item list-item--message'>
    <div>
      <h3 className='list-item__title'>You dont have any category registered.</h3>
      <button className='button' onClick={() => buttonAction()}>
        Start with standard categories
      </button>
    </div>
  </div>
)

AddStandardCategories.propTypes = {
  buttonAction: PropTypes.func.isRequired
}

export default AddStandardCategories
