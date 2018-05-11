import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => {
    const visibleExpenses = selectExpenses(props.expenses, props.filters);
    const totalFromVisible = selectExpensesTotal(visibleExpenses);
    const expenseWord = visibleExpenses.length === 1 ? 'expense' : 'expenses';
    const totalFromVisibleFormatted = numeral(totalFromVisible / 100).format('$0,0.00');
    
    return (
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Viewing <span>{visibleExpenses.length}</span> {expenseWord} totalling <span>{totalFromVisibleFormatted}</span></h1>
          <div className="page-header__actions">
            <Link className="button" to="/create">Add Expense</Link>
          </div>
        </div>
      </div>
    )
};

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    filters: state.filters
});

export default connect(mapStateToProps)(ExpensesSummary);