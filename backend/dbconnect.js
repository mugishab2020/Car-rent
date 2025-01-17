const mongoose = require ("mongoose");
const dotenv = require ('dotenv');

dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection successful!");
    } catch (error) {
        console.error('Error connecting to database?!:', error.message);
        process.exit(1);
    }
};



module.exports = dbConnection;
