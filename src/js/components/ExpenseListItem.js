import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import numeral from 'numeral'

const ExpenseListItem = ({
  id,
  description,
  amount,
  createdAt,
  note,
  handleFocus,
  isOnFocus
}) => (
  <div onClick={() => handleFocus(id)} className='list-item'>
    <div>
      <h3 className='list-item__title'>{description}</h3>
      <span className='list-item__sub-title'>{format(createdAt, 'MMMM Do, YYYY')}</span>
    </div>
    <h3 className='list-item__data'>{numeral(amount / 100).format('$0,0.00')}</h3>
    {
      isOnFocus &&
      <div className='list-item__block'>
        <p dangerouslySetInnerHTML={{__html: note.replace(/\n/g, '<br/>')}} />
        <Link to={`/edit/${id}`}>
          <button className='button button--edit'>
            Edit
          </button>
        </Link>
      </div>
    }
  </div>
)

ExpenseListItem.propTypes = {
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  note: PropTypes.string,
  handleFocus: PropTypes.func.isRequired,
  isOnFocus: PropTypes.bool.isRequired
}

export default ExpenseListItem
