import React from "react";
import PieChart from "../Charts/PieChart";
import CombinedData from "../Combined/CombinedData";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <CombinedData />
      <div className="mt-6">
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
