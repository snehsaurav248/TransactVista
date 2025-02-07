import React, { useState } from "react";
import Header from "./components/Header";
import TransactionTable from "./components/Transactions/TransactionTable";
import StatisticsBox from "./components/Statistics/StatisticsBox";
import BarChart from "./components/Charts/BarChart";
import { DataContext } from "./context/DataContext";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  return (
    <DataContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      <div className="container mx-auto p-4">
        <Header />
        <StatisticsBox />
        <TransactionTable />
        <BarChart />
      </div>
    </DataContext.Provider>
  );
};

export default App;
