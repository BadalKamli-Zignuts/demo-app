// Importing the Mongoose library
const mongoose = require("mongoose");

// Defining a function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Using Mongoose to connect to the MongoDB database using the provided URL
    await mongoose.connect(process.env.MONGO_URL);

    // Logging a message upon successful connection
    console.log(`Connected to MongoDB ${mongoose.connection.host}`.bgMagenta.white);
  } catch (error) {
    // Logging an error message if there's an issue connecting to the database
    console.log(`Error in server/config/db.js ${error}`.bgRed.white);
  }
};

// Exporting the connectDB function for use in other parts of the application
module.exports = connectDB;
