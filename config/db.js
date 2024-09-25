const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async() => {
    try {
        console.log("Connecting to DB")
        await mongoose.connect(db);
        console.log("Mongodb connected!!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB