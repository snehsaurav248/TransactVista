const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const { month, search = '', page = 1, perPage = 10 } = req.query;
        const regex = new RegExp(search, 'i');

        const transactions = await Transaction.find({
            dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') },
            $or: [{ title: regex }, { description: regex }, { price: regex }]
        })
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        const totalSales = await Transaction.aggregate([
            { $match: { dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') } } },
            { $group: { _id: null, totalAmount: { $sum: "$price" }, totalSold: { $sum: { $cond: ["$sold", 1, 0] } }, totalNotSold: { $sum: { $cond: ["$sold", 0, 1] } } } }
        ]);

        res.json(totalSales[0] || { totalAmount: 0, totalSold: 0, totalNotSold: 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
};

exports.getBarChart = async (req, res) => {
    try {
        const { month } = req.query;

        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901+', min: 901, max: Infinity }
        ];

        const chartData = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
            const count = await Transaction.countDocuments({
                dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') },
                price: { $gte: min, $lte: max }
            });
            return { range, count };
        }));

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
};

exports.getPieChart = async (req, res) => {
    try {
        const { month } = req.query;

        const categoryData = await Transaction.aggregate([
            { $match: { dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.json(categoryData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
};

exports.getCombinedData = async (req, res) => {
    try {
        const [transactions, statistics, barChart, pieChart] = await Promise.all([
            exports.getTransactions(req, res),
            exports.getStatistics(req, res),
            exports.getBarChart(req, res),
            exports.getPieChart(req, res)
        ]);

        res.json({ transactions, statistics, barChart, pieChart });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching combined data' });
    }
};
