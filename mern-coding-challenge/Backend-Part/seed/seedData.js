require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const connectDB = require('../config/db');

const seedDatabase = async () => {
    try {
        await connectDB();
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

        await Transaction.deleteMany(); // Clear old data
        await Transaction.insertMany(data);

        console.log('Database Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error Seeding Database:', error);
        process.exit(1);
    }
};

seedDatabase();
