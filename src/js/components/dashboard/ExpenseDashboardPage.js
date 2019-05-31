import React from 'react'
import { StickyContainer } from 'react-sticky'
import ExpenseList from './ExpenseList'
import ExpenseListFiltersContainer from './ExpenseListFiltersContainer'
import ExpenseSummary from './ExpensesSummary'

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummary />
    <StickyContainer>
      <ExpenseListFiltersContainer />
      <ExpenseList />
    </StickyContainer>
  </div>
)

export default ExpenseDashboardPage
