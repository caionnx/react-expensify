import moment from 'moment'

// Get visible/hidden expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
  const filtered = []
  const unfiltered = []

  expenses.forEach(expense => {
    const createdAtMoment = moment(expense.createdAt)
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    if (startDateMatch && endDateMatch && textMatch) {
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
