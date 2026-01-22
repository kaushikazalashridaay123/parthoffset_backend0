require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Attempting to connect to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection established!");
        process.exit(0);
    } catch (error) {
        console.error("Connection Failed:", error.message);
        process.exit(1);
    }
};

connectDB();
