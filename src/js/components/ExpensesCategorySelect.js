import React from 'react'
import { connect } from 'react-redux'
import { startSetCategories } from '../actions/categories'

export class ExpensesCategorySelect extends React.Component {
  componentDidMount () {
    this.props.fillCategories()
  }
  render () {
    const { categories, defaultValue } = this.props
    return (
      <select
        className='select'
        value={defaultValue}
        onChange={() => null}>
        <option key={defaultValue}>{defaultValue}</option>
        { categories.map(cat => <option key={cat.id}>{cat.value}</option>) }
      </select>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  fillCategories: () => dispatch(startSetCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesCategorySelect)
