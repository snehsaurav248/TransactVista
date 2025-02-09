import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { DataContext } from "../../context/DataContext";

const PieChart = () => {
  const { transactionsData, selectedMonth } = useContext(DataContext);

  if (!transactionsData || transactionsData.length === 0) {
    return <p>Loading or no data available...</p>;
  }

  const filteredTransactions = transactionsData.filter(txn => txn.month === selectedMonth);

  if (filteredTransactions.length === 0) {
    return <p>No data available for {selectedMonth}.</p>;
  }

  const categories = [...new Set(filteredTransactions.map(txn => txn.category))];
  const dataValues = categories.map(category =>
    filteredTransactions.filter(txn => txn.category === category).reduce((sum, txn) => sum + txn.amount, 0)
  );

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
