import React, { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Expense on pizza', amount: 499.00 },
    { id: 2, name: 'Expense on pizza', amount: 499.00 },
    { id: 3, name: 'Expense on pizza', amount: 499.00 },
    { id: 4, name: 'Expense on pizza', amount: 499.00 },
    { id: 5, name: 'Expense on pizza', amount: 499.00 }
  ]);

  const handleEdit = (id) => {
    console.log("Edit", id);
    // Logic to open edit modal or inline edit
  };

  const handleDelete = (id) => {
    const updated = expenses.filter(expense => expense.id !== id);
    setExpenses(updated);
  };

  return (
    <div className="expense-table-wrapper">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense.name}</td>
              <td>₹ {expense.amount.toFixed(2)}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(expense.id)}>
                  ✏️ Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(expense.id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
