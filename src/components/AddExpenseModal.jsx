// src/components/AddExpenseModal.jsx
import React from "react";
import "./AddExpenseModal.css";

const AddExpenseModal = ({ showModal, handleClose }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Expense</h2>
          <span className="close-button" onClick={handleClose}>
            &times;
          </span>
        </div>

        <form className="modal-form">
          <label>
            Expense Name<span className="required">*</span>
            <input type="text" placeholder="Expense Name" />
          </label>

          <label>
            Date<span className="required">*</span>
            <input type="date" />
          </label>

          <label>
            Category<span className="required">*</span>
            <select>
              <option value="">Choose a Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Utilities">Utilities</option>
            </select>
          </label>

          <label>
            Amount<span className="required">*</span>
            <input type="number" placeholder="Enter Amount" />
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
