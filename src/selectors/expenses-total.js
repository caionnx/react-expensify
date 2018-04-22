
 // Get total amount of expenses

 export default (expenses) => {
    const total = (expenses) =>
        expenses.reduce((amount, expense) =>
            amount + expense.amount, 0);

    return expenses.length > 0 ? total(expenses) : 0;
 }