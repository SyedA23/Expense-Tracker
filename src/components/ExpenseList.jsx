import React from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "./ExpenseList.css";

const ExpenseList = ({ expenses = [], onDeleteExpense, onEditExpense }) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = React.useState(null);

  const handleDeleteClick = (id) => {
    setSelectedExpenseId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteExpense(selectedExpenseId);
    setShowDeleteModal(false);
    setSelectedExpenseId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedExpenseId(null);
  };

  return (
    <div className="expense-table-wrapper">
      {expenses.length === 0 ? (
        <p className="no-expenses">
          No expenses added yet. Add your first expense!
        </p>
      ) : (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Expense</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id}>
                <td>{index + 1}</td>
                <td>{expense.name}</td>
                <td>₹{expense.amount.toLocaleString("en-IN")}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => onEditExpense(expense.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(expense.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteConfirmationModal
        showModal={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ExpenseList;
