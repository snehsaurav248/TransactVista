import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { fetchTransactions } from "../../services/api";

const TransactionTable = () => {
  const { selectedMonth } = useContext(DataContext);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions(selectedMonth, searchTerm).then(setTransactions);
  }, [selectedMonth, searchTerm]);

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search Transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border w-full rounded"
      />
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border">
              <td className="p-2">{txn.title}</td>
              <td className="p-2">{txn.description}</td>
              <td className="p-2">{txn.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
