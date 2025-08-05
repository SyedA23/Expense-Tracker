import { useState, useEffect } from "react";
import "./App.css";
import SummaryCard from "./components/SummaryCard";
import FilterBar from "./components/FilterBar";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseCharts from "./components/ExpenseCharts";
import AddBudgetModal from "./components/AddBudgetModal";
import ExpenseList from "./components/ExpenseList";
import EditExpenseModal from "./components/EditExpenseModal";

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Expenses");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    const savedBudget = localStorage.getItem("budget");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedBudget) {
      setTotalBudget(Number(savedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budget", totalBudget.toString());
  }, [totalBudget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddBudget = (amount) => {
    const budgetAmount = Number(amount) || 0;
    setTotalBudget(budgetAmount);
    setShowBudgetModal(false);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "All Expenses" ||
      expense.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = expense.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
      date: newExpense.date || new Date().toISOString()
    };
    setExpenses((prev) => [...prev, expenseWithId]);
    setShowExpenseModal(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setEditingExpense(expenseToEdit);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  const totalExpense = expenses.reduce(
    (total, item) => total + (item.amount || 0),
    0
  );

  return (
    <>
      <div className="container">
        <header>
          <h1>Expense Tracker</h1>
        </header>
      </div>

      <main>
        <h2>Hello, Areeb Syed</h2>
      </main>

      <SummaryCard totalBudget={totalBudget} totalExpense={totalExpense} />

      <div style={{ padding: "2rem" }}>
        <FilterBar
          onAddBudgetClick={() => setShowBudgetModal(true)}
          onAddExpenseClick={() => setShowExpenseModal(true)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Budget Modal */}
        {showBudgetModal && (
          <AddBudgetModal
            onClose={() => setShowBudgetModal(false)}
            onAddBudget={handleAddBudget}
          />
        )}

        {/* Expense Modal */}
        {showExpenseModal && (
          <AddExpenseModal
            showModal={showExpenseModal}
            handleClose={() => setShowExpenseModal(false)}
            onAddExpense={handleAddExpense}
            budget={totalBudget}
            expenses={expenses}
          />
        )}

        {editingExpense && (
          <EditExpenseModal
            expense={editingExpense}
            showModal={!!editingExpense}
            onClose={() => setEditingExpense(null)}
            onUpdate={handleUpdateExpense}
          />
        )}

        <ExpenseCharts expenses={expenses} />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
      </div>
    </>
  );
}

export default App;
