import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  startSetCategories,
  startRemoveCategory,
  startAddDefaultCategories
} from '../actions/categories'
import Modal from './Modal'
import EditCategoryItem from './EditCategoryItem'
import AddStandardCategories from './AddStandardCategories'
import AddCategoryForm from './AddCategoryForm'

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
            Categories
          </div>
          <div className='list-body'>
            {
              categories &&
              categories.map(category =>
                <EditCategoryItem
                  key={category.id}
                  category={category}
                  buttonAction={this.onOpenRemoveCategoryModal} />
              )
            }
            {
              (!categories || !categories.length) &&
              <AddStandardCategories buttonAction={this.props.startAddDefaultCategories} />
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

          <AddCategoryForm />
        </div>
      </div>
    )
  }
}

EditCategoriesPage.propTypes = {
  categories: PropTypes.array,
  fillCategories: PropTypes.func.isRequired,
  startRemoveCategory: PropTypes.func.isRequired,
  startAddDefaultCategories: PropTypes.func.isRequired
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  fillCategories: () => dispatch(startSetCategories()),
  startRemoveCategory: (uid) => dispatch(startRemoveCategory(uid)),
  startAddDefaultCategories: () => dispatch(startAddDefaultCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoriesPage)
