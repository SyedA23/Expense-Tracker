import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SummaryCard from "./components/SummaryCard";
import FilterBar from "./components/FilterBar";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseCharts from "./components/ExpenseCharts";

function App() {
  return (
    <>
      <div class="container">
        <header>
          <h1>Expense Tracker</h1>
        </header>
      </div>
      <main>
        <h2>Hello, Areeb Syed</h2>
      </main>
      <SummaryCard />
      <div style={{ padding: "2rem" }}>
        <FilterBar />
        <AddExpenseModal />
        <ExpenseCharts />
      </div>
    </>
  );
}

export default App;
