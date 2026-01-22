require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB. Fetching users...");
        
        const users = await User.find({}, 'userName email name');
        console.log("Found users:", JSON.stringify(users, null, 2));
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkUsers();
