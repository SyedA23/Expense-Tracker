import { useState } from "react";
import "./App.css";
import SummaryCard from "./components/SummaryCard";
import FilterBar from "./components/FilterBar";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseCharts from "./components/ExpenseCharts";
import AddBudgetModal from "./components/AddBudgetModal";
import ExpenseList from "./components/ExpenseList";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import EditExpenseModal from "./components/EditExpenseModal";

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  // ✅ Accept number only
  const handleAddBudget = ({ amount }) => {
    setTotalBudget(amount);
    setShowBudgetModal(false); // CLOSE modal after adding
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const totalExpense = expenses.reduce((total, item) => total + item.amount, 0);

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

      {/* ✅ Pass correct props */}
      <SummaryCard totalBudget={totalBudget} totalExpense={totalExpense} />

      <div style={{ padding: "2rem" }}>
        <FilterBar
          onOpenBudgetModal={() => setShowBudgetModal(true)}
          onCloseBudgetModal={() => setShowBudgetModal(false)}
          showBudgetModal={showBudgetModal}
          handleAddBudget={handleAddBudget}
          onOpenExpenseModal={() => setShowExpenseModal(true)}
          onCloseExpenseModal={() => setShowExpenseModal(false)}
          showExpenseModal={showExpenseModal}
        />

        {/* ✅ Show budget modal conditionally */}
        {showBudgetModal && (
          <AddBudgetModal
            onClose={() => setShowBudgetModal(false)}
            onAddBudget={handleAddBudget}
          />
        )}

        {showExpenseModal && (
          <AddExpenseModal
            showModal={showExpenseModal}
            handleClose={() => setShowExpenseModal(false)}
            onAddExpense={handleAddExpense}
          />
        )}
        <ExpenseCharts />
        <ExpenseList />
        <EditExpenseModal />
        <DeleteConfirmationModal />
      </div>
    </>
  );
}

export default App;
