import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { fetchStatistics } from "../../services/api";

const CombinedData = () => {
  const { selectedMonth } = useContext(DataContext);
  const [stats, setStats] = useState({ totalSale: 0, soldItems: 0, unsoldItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchStatistics(selectedMonth)
      .then((data) => {
        if (data && typeof data === "object") {
          setStats({
            totalSale: data.totalSaleAmount || 0,
            soldItems: data.totalSoldItems || 0,
            unsoldItems: data.totalNotSoldItems || 0,
          });
        } else {
          console.error("Invalid Statistics Data:", data);
          setError("Invalid data received.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching statistics:", err);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  }, [selectedMonth]);

  if (loading) return <p className="text-center text-gray-500">Loading statistics...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {[
        { label: "Total Sale", value: stats.totalSale, color: "bg-blue-500", prefix: "₹" },
        { label: "Sold Items", value: stats.soldItems, color: "bg-green-500" },
        { label: "Not Sold Items", value: stats.unsoldItems, color: "bg-red-500" },
      ].map((item, index) => (
        <div key={index} className={`${item.color} text-white p-4 rounded-lg shadow-md text-center`}>
          <h3 className="text-xl font-bold">{item.label}</h3>
          <p className="text-2xl">{item.prefix || ""}{item.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CombinedData;
