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

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const { selectedMonth } = useContext(DataContext);
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    fetchBarChartData(selectedMonth).then((data) => {
      if (data?.labels?.length && data?.values?.length) {
        setChartData({
          labels: data.labels,
          data: data.values,
        });
      } else {
        console.error("Invalid Bar Chart Data:", data);
      }
    }).catch((error) => console.error("Error fetching bar chart data:", error));
  }, [selectedMonth]);

  return (
    <div className="mt-4">
      <Bar
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Items in Price Range",
              data: chartData.data,
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarChart;
