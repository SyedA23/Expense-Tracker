import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ExpenseCharts.css";

const pieData = [
  { name: "Travel", value: 400 },
  { name: "Groceries", value: 300 },
  { name: "Food & Drink", value: 300 },
  { name: "Heal", value: 200 },
];

const barData = [
  { name: "Jan", expense: 120 },
  { name: "Mar", expense: 220 },
  { name: "May", expense: 160 },
  { name: "Jul", expense: 130 },
];

const COLORS = ["#3B82F6", "#FBCFE8", "#FB923C", "#22C55E"];

const ExpenseCharts = () => {
  return (
    <div className="charts-container">
      <div className="chart-title">Expense Chart</div>
      <div className="donut-chart">
        <PieChart width={250} height={250}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="donut-center-text">All</div>
        <div className="donut-legend">
          {pieData.map((entry, index) => (
            <div key={entry.name} className="legend-item">
              <span
                className="dot"
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      <div className="chart-title">Expenses Tracker</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="expense" fill="#3B82F6" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseCharts;
