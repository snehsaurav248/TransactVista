import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { fetchStatistics } from "../../services/api";

const StatisticsBox = () => {
  const { selectedMonth } = useContext(DataContext);
  const [stats, setStats] = useState({ totalSales: 0, soldItems: 0, notSold: 0 });

  useEffect(() => {
    fetchStatistics(selectedMonth).then(setStats);
  }, [selectedMonth]);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="p-4 bg-green-200 rounded">
        <h3>Total Sales</h3>
        <p>${stats.totalSales}</p>
      </div>
      <div className="p-4 bg-blue-200 rounded">
        <h3>Sold Items</h3>
        <p>{stats.soldItems}</p>
      </div>
      <div className="p-4 bg-red-200 rounded">
        <h3>Not Sold</h3>
        <p>{stats.notSold}</p>
      </div>
    </div>
  );
};

export default StatisticsBox;
