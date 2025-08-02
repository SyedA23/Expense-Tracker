import React, { useState, useEffect } from "react";
import "./EditExpenseModal.css";

const EditExpenseModal = ({ expense, showModal, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    category: "",
    amount: ""
  });

  // Initialize form with expense data when modal opens or expense changes
  useEffect(() => {
    if (expense) {
      setFormData({
        name: expense.name || "",
        date: expense.date ? expense.date.split("T")[0] : "",
        category: expense.category || "",
        amount: expense.amount || ""
      });
    }
  }, [expense, showModal]);

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
    if (!formData.name || !formData.date || !formData.amount) {
      alert("Please fill all required fields");
      return;
    }

    // Prepare updated expense object
    const updatedExpense = {
      ...expense,
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString()
    };

    onUpdate(updatedExpense);
    onClose();
  };

  if (!showModal) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Expense</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label htmlFor="edit-name">
            Expense Name<span className="required">*</span>
            <input
              id="edit-name"
              name="name"
              type="text"
              placeholder="Expense Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="edit-date">
            Date<span className="required">*</span>
            <input
              id="edit-date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="edit-category">
            Category<span className="required">*</span>
            <select
              id="edit-category"
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

          <label htmlFor="edit-amount">
            Amount<span className="required">*</span>
            <input
              id="edit-amount"
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

          <div className="modal-actions">
            <button type="submit" className="add-btn">
              + Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
