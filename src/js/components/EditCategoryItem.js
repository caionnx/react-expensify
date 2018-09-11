import React from 'react'
import PropTypes from 'prop-types'

export const EditCategoryItem = ({ category, buttonAction }) => (
  <div className='list-item list-item--no-link' key={category.id}>
    <h3 className='list-item__title'>{category.value}</h3>
    <button title='Remove category' className='button button--link button--hover-close' onClick={() => buttonAction(category.id)}>
      <svg className='icon' viewBox='0 0 12 12' width='12' height='12'>
        <path fillRule='evenodd' d='M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z' />
      </svg>
    </button>
  </div>
)

EditCategoryItem.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  category: PropTypes.object
}

export default EditCategoryItem
