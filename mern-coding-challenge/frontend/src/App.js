import React, { useEffect, useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
import { DataContext } from "./context/DataContext";
import { fetchStatistics } from "./services/api";  // ✅ Use correct import
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ✅ Register the required Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { selectedMonth } = useContext(DataContext);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchStatistics(selectedMonth) // ✅ Use fetchStatistics instead of fetchPieChartData
      .then((data) => {
        if (data?.categories && data?.values) {
          setChartData({
            labels: data.categories,
            values: data.values,
          });
        } else {
          console.error("Invalid Pie Chart Data:", data);
        }
      })
      .catch((error) => console.error("Error fetching pie chart data:", error));
  }, [selectedMonth]);

  return (
    <div className="mt-4">
      <Pie
        data={{
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.values,
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
