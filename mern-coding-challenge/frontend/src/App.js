import React, { useState } from "react";
import Header from "./components/Header";
import TransactionTable from "./components/Transactions/TransactionTable";
import StatisticsBox from "./components/Statistics/StatisticsBox";
import BarChart from "./components/Charts/BarChart";
import PieChart from "./components/Charts/PieChart";
import CombinedData from "./components/Combined/CombinedData";
import { DataContext } from "./context/DataContext";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  return (
    <DataContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      <div className="container mx-auto p-4">
        <Header />
        
        {/* Month Selector Dropdown */}
        <div className="mb-4 flex justify-end">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded-md shadow-sm bg-white"
          >
            {["January", "February", "March", "April", "May"].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <StatisticsBox />
        <TransactionTable />

        {/* Combined Data (Previously Summary Cards) */}
        <CombinedData />  

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChart />
          <PieChart />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
