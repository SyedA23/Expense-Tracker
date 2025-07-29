import React from "react";
import AddExpenseModal from "./AddExpenseModal";
import AddBudgetModal from "./AddBudgetModal";
import "./FilterBar.css";
import {
  FaSearch,
  FaPlus,
  FaPizzaSlice,
  FaShoppingBag,
  FaSuitcase,
  FaHeartbeat,
  FaWallet
} from "react-icons/fa";

const categories = [
  { icon: <FaWallet />, label: "All Expenses", active: true },
  { icon: <FaPizzaSlice />, label: "Food & Drinks" },
  { icon: <FaShoppingBag />, label: "Groceries" },
  { icon: <FaSuitcase />, label: "Travel" },
  { icon: <FaHeartbeat />, label: "Health" }
];

const FilterBar = ({
  onOpenBudgetModal,
  onCloseBudgetModal,
  showBudgetModal,
  handleAddBudget,
  onOpenExpenseModal,
  onCloseExpenseModal,
  showExpenseModal
}) => {
  return (
    <div className="filter-bar">
      {/* Search Box */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map(({ icon, label, active }) => (
          <button
            key={label}
            className={`category-button ${active ? "active" : ""}`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="budget-button" onClick={onOpenBudgetModal}>
          <FaPlus /> Add Budget
        </button>
        <button className="expense-button" onClick={onOpenExpenseModal}>
          <FaPlus /> Add Expense
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
