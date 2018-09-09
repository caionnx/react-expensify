import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { startAddCategory } from '../actions/categories'

export class AddCategoryForm extends React.Component {
  state = {
    error: ''
  }

  onAddCategory = (event) => {
    event.preventDefault()
    const node = event.target.querySelector(`#new-category`)
    const value = node && node.value
    const id = slugify(value, { replacement: '-', remove: null, lower: true })

    if (id === '') {
      this.setState(() => ({ error: 'Please provide category name.' }))
      return
    }
    if (this.props.categories.filter((item) => item.id === id).length) {
      this.setState(() => ({ error: 'Category already registered.' }))
      return
    }

    this.setState(() => ({ error: '' }))
    this.props.startAddCategory({ id, value })
    node.value = ''
  }

  render () {
    const { error } = this.state

    return (
      <form onSubmit={this.onAddCategory}>
        {error && <p className='form__error'>{error}</p>}
        <div className='input-group'>
          <div className='input-group__item'>
            <input id='new-category' className='text-input' placeholder='New Category' type='text' />
          </div>
          <div className='input-group__item'>
            <button className='button'>Add Category</button>
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
