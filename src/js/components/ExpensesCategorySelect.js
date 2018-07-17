import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startSetCategories } from '../actions/categories'

export class ExpensesCategorySelect extends React.Component {
  state = {
    value: this.props.defaultValue
  }

  componentDidMount () {
    if (this.props.categories && !this.props.categories.length) {
      this.props.fillCategories()
    }
  }

  onChangeOption = (callbackFn) => (event) => {
    this.setState({value: event.target.value})
    return callbackFn && callbackFn(event.target.value)
  }

  render () {
    const { categories, defaultValue } = this.props
    return (
      <select
        className='select'
        value={this.state.value}
        onChange={this.onChangeOption(this.props.onChange)}>
        <option key={defaultValue} value='none'>{this.props.defaultText}</option>
        { categories
          ? categories.map(ct => <option key={ct.id} value={ct.id}>{ct.value}</option>)
          : ''
        }
      </select>
    )
  }
}

ExpensesCategorySelect.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  categories: PropTypes.array,
  onChange: PropTypes.func,
  fillCategories: PropTypes.func.isRequired
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  fillCategories: () => dispatch(startSetCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesCategorySelect)