import React from 'react'
import { connect } from 'react-redux'
import { startSetCategories } from '../actions/categories'

export class ExpensesCategorySelect extends React.Component {
  state = {
    value: null
  }

  componentDidMount () {
    if (this.props.categories && !this.props.categories.length) {
      this.props.fillCategories()
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (!state.value) {
      return { value: props.defaultValue }
    }
    return null
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
        { categories.map(ct => <option key={ct.id} value={ct.id}>{ct.value}</option>) }
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
