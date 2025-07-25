import React, { useState } from "react";
import "./AddBudgetModal.css";

const AddBudgetModal = ({ budgetModal, budgetClose, onAddBudget }) => {
  const [amount, setAmount] = useState("");

  if (!budgetModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAddBudget({ amount: parseFloat(amount) });
    setAmount("");
    budgetClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Budget</h2>
          <button onClick={budgetClose} className="close-btn">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <label>
            Amount<span className="required">*</span>
          </label>
          <input
            type="number"
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
