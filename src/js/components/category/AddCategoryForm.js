import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { startAddCategory } from '../../actions/categories'

export class AddCategoryForm extends React.Component {
  state = {
    error: '',
    newCategory: ''
  }

  onAddCategory = (event) => {
    event.preventDefault()
    const value = this.state.newCategory
    const id = slugify(value, { replacement: '-', remove: null, lower: true })

    if (id === '') {
      this.setState(() => ({ error: 'Please provide category name.' }))
      return
    }
    if (this.props.categories.filter((item) => item.id === id).length) {
      this.setState(() => ({ error: 'Category already registered.' }))
      return
    }

    this.setState(() => ({ error: '', newCategory: '' }))
    this.props.startAddCategory({ id, value })
  }

  onInputChange = (event) => {
    this.setState({ newCategory: event.target.value })
  }

  render () {
    const { error, newCategory } = this.state

    return (
      <form onSubmit={this.onAddCategory}>
        {error && <p className='form__error'>{error}</p>}
        <div className='input-group'>
          <div className='input-group__item input-group__item--expanded'>
            <input
              value={newCategory}
              onChange={this.onInputChange}
              className='text-input'
              placeholder='New Category'
              type='text' />
          </div>
          <div className='input-group__item'>
            <button className='button button--expanded'>Add Category</button>
          </div>
        </div>
      </form>
    )
  }
}

AddCategoryForm.propTypes = {
  categories: PropTypes.array,
  startAddCategory: PropTypes.func.isRequired
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  startAddCategory: (category) => dispatch(startAddCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm)
