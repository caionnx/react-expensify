import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => {
    const visibleExpenses = selectExpenses(props.expenses, props.filters);
    const totalFromVisible = selectExpensesTotal(visibleExpenses);
    const expenseWord = visibleExpenses.length === 1 ? 'expense' : 'expenses';
    
    return (
        <p>
            Viewing {visibleExpenses.length} {expenseWord} totalling {numeral(totalFromVisible / 100).format('$0,0.00')}
        </p>
    )
};

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    filters: state.filters
});

export default connect(mapStateToProps)(ExpensesSummary);