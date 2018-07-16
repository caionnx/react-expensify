import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { startSetCategories } from '../actions/categories'

export class EditCategoriesPage extends React.Component {
  state = {
    removeCategoryModal: false,
    uidToRemove: false
  }
  onOpenRemoveCategoryModal = (id) => {
    this.setState({ removeCategoryModal: true })
  }
  onCloseRemoveCategoryModal = () => {
    this.setState({ removeCategoryModal: false })
  }
  componentDidMount () {
    const { categories } = this.props

    if (categories && !categories.length) {
      this.props.fillCategories()
    }
  }

  render () {
    const { categories } = this.props

    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Edit your categories</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className='list-header'>
            <div className='show-for-mobile'>Categories</div>
            <div className='show-for-desktop'>Categories</div>
          </div>
          <div className='list-body'>
            {
              categories && categories.map(
                item =>
                  <div className='list-item' key={item.id}>
                    <h3 className='list-item__title'>{item.value}</h3>
                    <button onClick={() => this.onOpenRemoveCategoryModal(item.id)}>
                      <svg viewBox='0 0 12 12' width='12' height='12'>
                        <path fillRule='evenodd' d='M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z' />
                      </svg>
                    </button>
                  </div>
              )
            }
          </div>
          <Modal
            isOpen={this.state.removeCategoryModal}
            onRequestClose={this.onCloseRemoveCategoryModal}
            appElement={document.getElementById('app')}
            contentLabel='Remove Expense Modal'
            closeTimeoutMS={200}
            className='modal'>

            <p className='modal__body'>Are you sure you want to remove this category?</p>
            <div className='modal__options'>
              <button id='closeRemoveExpenseModal' className='button' onClick={this.onCloseRemoveCategoryModal}>Cancel</button>
              <button id='removeExpense' className='button button--secondary' onClick={this.onRemove}>Remove</button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

EditCategoriesPage.propTypes = {
  categories: PropTypes.array,
  fillCategories: PropTypes.func.isRequired
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  fillCategories: () => dispatch(startSetCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoriesPage)
