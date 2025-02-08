import React, { useEffect, useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DataContext } from "../../context/DataContext";
import { fetchBarChartData } from "../../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// ✅ Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const { selectedMonth } = useContext(DataContext);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchBarChartData(selectedMonth).then((data) => {
      setChartData({
        labels: data.labels,
        values: data.values,
      });
    });
  }, [selectedMonth]);

  return (
    <div className="mt-4">
      <Bar
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Items in Price Range",
              data: chartData.values,
              backgroundColor: "rgba(75,192,192,0.4)",
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
