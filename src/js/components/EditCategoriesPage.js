import React from 'react'
import { connect } from 'react-redux'
import Modal from './Modal'
import slugify from 'slugify'
import PropTypes from 'prop-types'
import {
  startSetCategories,
  startRemoveCategory,
  startAddCategory
} from '../actions/categories'

export class EditCategoriesPage extends React.Component {
  state = {
    removeCategoryModal: false,
    idToRemove: false,
    error: ''
  }
  onOpenRemoveCategoryModal = (id) => {
    this.setState({ removeCategoryModal: true, idToRemove: id })
  }
  onCloseRemoveCategoryModal = () => {
    this.setState({ removeCategoryModal: false })
  }
  onRemove = () => {
    if (this.state.idToRemove) {
      this.props.startRemoveCategory({ id: this.state.idToRemove }).then(() => {
        this.setState({ removeCategoryModal: false })
      })
    }
  }
  onAddCategory = (event) => {
    event.preventDefault()
    const node = event.target.querySelector(`#new-category`)
    const value = node && node.value
    const id = slugify(value, { replacement: '-', remove: null, lower: true })

    if (id === '') {
      this.setState(() => ({ error: 'Please provide category name.' }))
    } else if (this.props.categories.filter((item) => item.id === id).length) {
      this.setState(() => ({ error: 'Category already registered.' }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.startAddCategory({ id, value })
      node.value = ''
    }
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
            label='Remove category'
            className='modal'
            body='Are you sure you want to remove this category?'
            confirmText='Remove'
            cancelText='Cancel'
            thunk
            onConfirm={this.onRemove}
            onClose={this.onCloseRemoveCategoryModal} />

          {this.state.error && <p className='form__error'>{this.state.error}</p>}
          <form onSubmit={this.onAddCategory}>
            <div className='input-group'>
              <div className='input-group__item'>
                <input id='new-category' className='text-input' placeholder='New Category' type='text' />
              </div>
              <div className='input-group__item'>
                <button className='button'>Add Category</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

EditCategoriesPage.propTypes = {
  categories: PropTypes.array,
  fillCategories: PropTypes.func.isRequired,
  startRemoveCategory: PropTypes.func.isRequired,
  startAddCategory: PropTypes.func.isRequired
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  fillCategories: () => dispatch(startSetCategories()),
  startRemoveCategory: (uid) => dispatch(startRemoveCategory(uid)),
  startAddCategory: (category) => dispatch(startAddCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoriesPage)
