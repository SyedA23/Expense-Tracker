// src/components/BudgetSummary.jsx
import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ totalBudget, totalExpense }) => {
  const remainingBudget = totalBudget - totalExpense;

  const formatAmount = (amount) =>
    "₹" + Number(amount || 0).toLocaleString("en-IN");

  return (
    <div className="budget-summary">
      <div className="card total">
        <p>Total Budget</p>
        <h2>{formatAmount(totalBudget)}</h2>
      </div>
      <div className="card">
        <p>Total Expense</p>
        <h2>{formatAmount(totalExpense)}</h2>
      </div>
      <div className="card">
        <p>Remaining Budget</p>
        <h2>{formatAmount(remainingBudget)}</h2>
      </div>
    </div>
  );
};
export default SummaryCard;
