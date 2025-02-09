import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("November");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const data = await response.json();

        // Transform data to match transaction format
        const formattedData = data.map(item => ({
          category: item.category,
          amount: item.price,
          month: new Date(item.dateOfSale).toLocaleString("default", { month: "long" })
        }));

        setTransactionsData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ transactionsData, selectedMonth, setSelectedMonth }}>
      {children}
    </DataContext.Provider>
  );
};
