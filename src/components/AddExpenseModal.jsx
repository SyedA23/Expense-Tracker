import React, { useState } from "react";
import "./AddExpenseModal.css";

const AddExpenseModal = ({ showModal, handleClose, onAddExpense }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    category: "",
    amount: ""
  });

  if (!showModal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.date ||
      !formData.category ||
      !formData.amount
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Create expense object
    const newExpense = {
      id: Date.now(), // temporary ID
      name: formData.name,
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount)
    };

    // Pass to parent component
    onAddExpense(newExpense);

    // Close modal and reset form
    handleClose();
    setFormData({
      name: "",
      date: "",
      category: "",
      amount: ""
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Expense</h2>
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="expenseName">
            Expense Name<span className="required">*</span>
            <input
              id="expenseName"
              name="name"
              type="text"
              placeholder="Expense Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="expenseDate">
            Date<span className="required">*</span>
            <input
              id="expenseDate"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="expenseCategory">
            Category<span className="required">*</span>
            <select
              id="expenseCategory"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose a Category</option>
              <option value="Food & Drinks">Food & Drinks</option>
              <option value="Travel">Travel</option>
              <option value="Groceries">Groceries</option>
              <option value="Health">Health</option>
            </select>
          </label>

          <label htmlFor="expenseAmount">
            Amount<span className="required">*</span>
            <input
              id="expenseAmount"
              name="amount"
              type="number"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </label>

          <button type="submit" className="add-expense-btn">
            + Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
