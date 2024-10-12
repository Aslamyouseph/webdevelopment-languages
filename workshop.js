// Import the required modules
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose"); // Mongoose for MongoDB interaction

// Connecting to the MongoDB database (Promise-based connection)
mongoose
  .connect("mongodb://localhost:27017/student") // 'student' is the name of the database
  .then(() => {
    console.log("Connected to MongoDB"); // Successful connection message
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error); // Error message on failure
  });

// Define a Mongoose schema for 'student_details'
// This schema outlines the structure of the data being saved
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // This field is mandatory
  },
  email: {
    type: String,
    required: true, // This field is mandatory
  },
  password: {
    type: String,
    required: true, // This field is mandatory
  },
});

// Create a model for the 'student_details' collection using the schema
// This model represents the 'student_details' collection in MongoDB
const Student = mongoose.model("student_details", studentSchema);

/* GET signup page route. */
// This route serves the signup form to the user when they visit "/signup"
router.get("/", function (req, res, next) {
  res.render("signup"); // Renders the signup form (signup.hbs)
});

/* POST signup form submission route. */
// This route handles form submission (POST request to "/signupSubmit")
router.post("/signupSubmit", async function (req, res) {
  try {
    // Log the submitted form data in the console
    console.log(req.body);

    // Create a new student instance with the data from the form
    const newStudent = new Student({
      name: req.body.name, // Name entered in the form
      email: req.body.email, // Email entered in the form
      password: req.body.password, // Password entered in the form
    });

    // Save the new student data to MongoDB
    await newStudent.save();

    // Send a success message to the client after saving
    res.send("Thank you for signing up! Your data has been saved.");
  } catch (error) {
    // Handle any errors during the save process
    console.error("Error saving data:", error);
    res.status(500).send("An error occurred while saving your data.");
  }
});

// Export the router module to make it accessible in other parts of the app
module.exports = router;
