import React from "react";
import {
  FaSearch,
  FaPlus,
  FaPizzaSlice,
  FaShoppingBag,
  FaSuitcase,
  FaHeartbeat,
  FaWallet
} from "react-icons/fa";
import "./FilterBar.css";

const categories = [
  { icon: <FaWallet />, label: "All Expenses" },
  { icon: <FaPizzaSlice />, label: "Food & Drinks" },
  { icon: <FaShoppingBag />, label: "Groceries" },
  { icon: <FaSuitcase />, label: "Travel" },
  { icon: <FaHeartbeat />, label: "Health" }
];

const FilterBar = ({
  onAddBudgetClick,
  onAddExpenseClick,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="category-buttons">
        {categories.map(({ icon, label }) => (
          <button
            key={label}
            className={`category-button ${
              label === selectedCategory ? "active" : ""
            }`}
            onClick={() => onCategorySelect(label)}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button className="budget-button" onClick={onAddBudgetClick}>
          <FaPlus /> Add Budget
        </button>
        <button className="expense-button" onClick={onAddExpenseClick}>
          <FaPlus /> Add Expense
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
