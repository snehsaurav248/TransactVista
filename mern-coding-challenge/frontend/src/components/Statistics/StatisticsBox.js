import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import transactionsData from "../../data/transactionsData";

const StatisticsBox = () => {
  const { selectedMonth } = useContext(DataContext);

  const filteredTransactions = transactionsData.filter(
    (txn) => txn.month === selectedMonth
  );

  const totalSpending = filteredTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Statistics for {selectedMonth}</h2>
      <p>Total Spending: ${totalSpending.toFixed(2)}</p>
    </div>
  );
};

export default StatisticsBox;
