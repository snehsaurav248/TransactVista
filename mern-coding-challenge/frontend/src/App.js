import React from "react";
import BarChart from "./components/Charts/BarChart";
import PieChart from "./components/Charts/PieChart";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transaction Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Expense Breakdown</h2>
          <PieChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Category-wise Expenses</h2>
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default App;
