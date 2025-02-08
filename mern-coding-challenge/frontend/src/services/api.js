export const fetchTransactions = async (month, search = "") => {
  const response = await fetch(`/api/transactions?month=${month}&search=${search}`);
  return response.json();
};

export const fetchStatistics = async (month) => {
  const response = await fetch(`/api/statistics?month=${month}`);
  return response.json();
};

export const fetchBarChartData = async (month) => {
  const response = await fetch(`/api/bar-chart?month=${month}`);
  return response.json();
};

export const fetchPieChartData = async (month) => {
  const response = await fetch(`/api/pie-chart?month=${month}`);
  return response.json();
};
