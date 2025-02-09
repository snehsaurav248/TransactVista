import React, { createContext, useState, useEffect } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
      .then((response) => response.json())
      .then((data) => setTransactionsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <TransactionContext.Provider value={{ transactionsData }}>
      {children}
    </TransactionContext.Provider>
  );
};
