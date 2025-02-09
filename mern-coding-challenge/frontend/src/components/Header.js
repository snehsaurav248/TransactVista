import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Header = () => {
  const { selectedMonth, setSelectedMonth } = useContext(DataContext);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
      <h1 className="text-xl font-bold">Transactions Dashboard</h1>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="p-2 border rounded"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
