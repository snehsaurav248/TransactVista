const API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const getMonthFromDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", { month: "long" });
};

// Fetch transactions with optional search
export const fetchTransactions = async (month, search = "") => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data
    .filter((txn) => getMonthFromDate(txn.dateOfSale) === month)
    .filter((txn) => txn.title.toLowerCase().includes(search.toLowerCase()));
};

// Fetch statistics (Total Sales, Items Sold, Transactions)
export const fetchStatistics = async (month) => {
  const transactions = await fetchTransactions(month);
  const totalSales = transactions.reduce((sum, txn) => sum + txn.price, 0);
  const totalItemsSold = transactions.length;

  return {
    totalSales: totalSales.toFixed(2),
    totalItemsSold,
    totalTransactions: transactions.length,
  };
};

// Fetch data for bar chart (price ranges)
export const fetchBarChartData = async (month) => {
  const transactions = await fetchTransactions(month);

  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501+": 0,
  };

  transactions.forEach((txn) => {
    if (txn.price <= 100) priceRanges["0-100"]++;
    else if (txn.price <= 200) priceRanges["101-200"]++;
    else if (txn.price <= 300) priceRanges["201-300"]++;
    else if (txn.price <= 400) priceRanges["301-400"]++;
    else if (txn.price <= 500) priceRanges["401-500"]++;
    else priceRanges["501+"]++;
  });

  return priceRanges;
};

// Fetch data for pie chart (category distribution)
export const fetchPieChartData = async (month) => {
  const transactions = await fetchTransactions(month);

  const categoryCount = {};

  transactions.forEach((txn) => {
    categoryCount[txn.category] = (categoryCount[txn.category] || 0) + 1;
  });

  return categoryCount;
};
