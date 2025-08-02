import React, { useState, useEffect } from "react";
import "./AddBudgetModal.css";

const AddBudgetModal = ({ onClose, onAddBudget }) => {
  const [amount, setAmount] = useState("");

  // Optional: Close modal on pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAddBudget(parsedAmount);
    setAmount(""); // Reset input
    onClose(); // Close modal
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose(); // Clicking outside modal closes it
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>Add Budget</h2>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <label>
            Amount<span className="required">*</span>
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            + Add Budget
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
