const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: new Date(0).toISOString(),
  endDate: new Date(259200000).toISOString()
}

export { filters, altFilters }
