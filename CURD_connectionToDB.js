const mongoose = require("mongoose");
//we assigning the entire connection into a variable
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/student", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Export the connectDB function (or connection to DB )  for accessing
/**
 * In here when we call the connectDB function then only it will connect to the database.
 * This connectDB function is calling on CRUD_insertionOfDataToDB.js file . so we want to run this file
 * then only the connection code will start its execution
 */
