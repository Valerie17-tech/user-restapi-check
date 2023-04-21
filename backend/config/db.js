const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}

module.exports = connectDB
const express = require('express');
const port = 5000;
const app = express();