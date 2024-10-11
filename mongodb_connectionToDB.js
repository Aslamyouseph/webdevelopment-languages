const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // For accessing the  HTML file
const app = express();

/**Without this middleware, your server wouldn’t be able to parse the form data,
 * and req.body would be undefined when trying to access the form's input values.
 * By using this middleware, you can easily retrieve form data from the req.body
 * object. */
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/student")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a schema/collection type for the student details
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model for the student collection
const Student = mongoose.model("student_details", studentSchema);

// display  the mongodb_signupForm.html . in here the route is set for this file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "mongodb_signupForm.html")); // Serve the HTML form
});

//when the use enter the submit button this this block of code will start the exicution
app.post("/signupSubmit", async (req, res) => {
  try {
    // Create a new student document from the form data
    const newStudent = new Student({
      /**The line name: req.body.name is used to extract the value of the name
       *  field that a user has entered in a form and sent to the server through a POST request
       * */
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the student to the database
    await newStudent.save();
    res.send("Thank you for signing up! Your data has been saved.");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("An error occurred while saving your data.");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
