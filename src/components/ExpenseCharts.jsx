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
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  FaUtensils,
  FaShoppingCart,
  FaPlane,
  FaHeartbeat
} from "react-icons/fa";
import "./ExpenseCharts.css"; // New CSS file for styling

const CATEGORY_ICONS = {
  "Food & Drinks": <FaUtensils />,
  Groceries: <FaShoppingCart />,
  Travel: <FaPlane />,
  Health: <FaHeartbeat />
};

const COLORS = {
  "Food & Drinks": "#F68D2B",
  Groceries: "#F4A79D",
  Travel: "#344BFD",
  Health: "#23A52C"
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const ExpenseCharts = ({ expenses }) => {
  // Process category data with icons
  const processCategoryData = () => {
    const categoryMap = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = {
          name: category,
          value: 0,
          icon: CATEGORY_ICONS[category] || null,
          color: COLORS[category] || "#8884d8"
        };
      }
      acc[category].value += expense.amount;
      return acc;
    }, {});

    return Object.values(categoryMap);
  };

  // Process monthly data with all months
  const processMonthlyData = () => {
    const monthlyMap = {};

    // Initialize all months
    MONTHS.forEach((month) => {
      monthlyMap[month] = { name: month, value: 0 };
    });

    // Add actual expenses
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "short"
      });
      if (monthlyMap[month]) {
        monthlyMap[month].value += expense.amount;
      }
    });

    return Object.values(monthlyMap);
  };

  const categoryData = processCategoryData();
  const monthlyData = processMonthlyData();

  return (
    <div className="charts-container">
      {/* Pie Chart Section */}
      <div className="chart-section">
        <h3 className="chart-title">Expense Chart</h3>
        <div className="category-legend">
          {categoryData.map((category) => (
            <div key={category.name} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: category.color }}
              />
              <span className="legend-name">{category.name}</span>
              <span className="legend-icon">{category.icon}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR"
                }).format(value),
                "Amount"
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-section">
        <h3 className="chart-title">Expenses Tracker</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            {/* <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
            /> */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={false}
            />
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR"
                }).format(value),
                "Amount"
              ]}
              labelFormatter={(label) => `Month: ${label}`}
            />

            <Bar
              dataKey="value"
              fill="#375CFF"
              radius={[4, 4, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;
