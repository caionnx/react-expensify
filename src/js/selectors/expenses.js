import isBefore from 'date-fns/is_before'
import isEqual from 'date-fns/is_equal'
import isAfter from 'date-fns/is_after'

// Get visible/hidden expenses

export default (expenses, { text, sortBy, startDate, endDate, category }) => {
  const filtered = []
  const unfiltered = []

  expenses.forEach(expense => {
    const createdAt = expense.createdAt
    const startDateMatch = startDate ? isBefore(startDate, createdAt) || isEqual(createdAt, startDate) : true
    const endDateMatch = endDate ? isAfter(endDate, createdAt) || isEqual(createdAt, endDate) : true
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    const categoryMatch = category && category !== 'none' ? expense.category === category : true

    if (startDateMatch && endDateMatch && textMatch && categoryMatch) {
      filtered.push(expense)
    } else {
      unfiltered.push(expense)
    }
  })

  return {
    filtered: filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1
      }
    }),
    unfiltered
  }
}
