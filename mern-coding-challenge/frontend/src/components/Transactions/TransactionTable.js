import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import transactionsData from "../../data/transactionsData"; // Assume this contains all transactions

const TransactionTable = () => {
  const { selectedMonth } = useContext(DataContext);

  const filteredTransactions = transactionsData.filter(
    (txn) => txn.month === selectedMonth
  );

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((txn, index) => (
          <tr key={index}>
            <td className="border p-2">{txn.date}</td>
            <td className="border p-2">{txn.category}</td>
            <td className="border p-2">{txn.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
