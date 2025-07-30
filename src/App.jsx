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

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddBudget = (amount) => {
    const budgetAmount = Number(amount) || 0;
    setTotalBudget(budgetAmount);
    setShowBudgetModal(false);
  };

  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(), // Dynamic ID generation
      date: newExpense.date || new Date().toISOString() // Ensure date exists
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
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
      </div>
    </>
  );
}

export default App;
