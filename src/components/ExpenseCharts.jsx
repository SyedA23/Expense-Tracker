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
  ResponsiveContainer
} from "recharts";
import { FaShoppingBag, FaPizzaSlice, FaSuitcase } from "react-icons/fa";

import "./ExpenseCharts.css";

const pieData = [
  { name: "Travel", value: 400 },
  { name: "Groceries", value: 300 },
  { name: "Food & Drink", value: 300 },
  { name: "Heal", value: 200 }
];

const barData = [
  { name: "Jan", expense: 120 },
  { name: "Mar", expense: 220 },
  { name: "May", expense: 160 },
  { name: "Jul", expense: 130 }
];

const COLORS = ["#344BFD", "#F4A79D", "#F68D2B", "#23A52C"];

const ExpenseCharts = () => {
  return (
    <div className="charts-container">
      <div className="chart-title">
        Expense Chart
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
          {/* Icons around the chart */}
          <div className="icon icon1">
            <FaShoppingBag />
          </div>
          <div className="icon icon2">
            <FaPizzaSlice />
          </div>
          <div className="icon icon3">
            <FaSuitcase />
          </div>
        </div>
      </div>

      <div className="chart-title">
        Expense Tracker
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="expense" fill="#344BFD" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;
