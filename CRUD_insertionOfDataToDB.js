/*This file wants to run first because
1 => Initializes the Express App:  This file creates the Express server (const app = express();)
2= > Connects to MongoDB: It uses the connectDB() function (from CRUD_connectionTODB.js) to establish a connection to your MongoDB database.
3=> Defines Routes: This file contains all the route definitions (e.g., /signupSubmit, /CRUD_display, /delete/:id), which are essential for handling various operations like creating, reading, updating, and deleting data.
4=>Handles Request Data:It processes form submissions and validates user input before saving it to the database.
5=>Starts the Server: Finally, this file contains the code that starts your server
*/

const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const validator = require("validator");
const connectDB = require("./CURD_connectionToDB"); // Import connection file to create a connection
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");

const app = express();

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// Security middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine.it is important for indicating we are using the handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Define student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [20, "Name cannot exceed 20 characters"],
    validate: {
      validator: (value) => /^[a-zA-Z\s]+$/.test(value),
      message: "Name must contain only alphabets and spaces",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters long"],
  },
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create Student model
const Student = mongoose.model("student_details", studentSchema);

// Serve the Handlebars form(if we using a handlebar template file then we need to give res.render)
//always the handlebar file should be inside the views folder
app.get("/", (req, res) => {
  res.render("CRUD_form"); // This will look for CRUD_form.handlebars inside the views folder
});

//display operations (during this time it first check the views folder then inside it check layout file . if layout file contain
// the main.handlebars folder then only it check the CRUD_display.handlebars )
app.get("/CRUD_display", async (req, res) => {
  try {
    // Fetch all student records and convert them to plain objects
    const students = await Student.find().lean();
    res.render("CRUD_display", { students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("An error occurred while fetching data");
  }
});
// updating data operations
app.get("/CRUD_form/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean(); // Find the student with the specified ID
    res.render("CRUD_form", { student }); // Pass a single student object to the CRUD_form file , not students
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).send("An error occurred while fetching data");
  }
});
//deleting data operations
app.get("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/CRUD_display");
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("An error occurred while deleting data");
  }
});
// Handle form submission and data insertion
app.post("/signupSubmit", async (req, res) => {
  try {
    const { id, name, email, password } = req.body;

    // Validate inputs
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      throw new Error("Name must be between 3 and 20 characters");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    if (id) {
      // Update existing student
      const existingStudent = await Student.findById(id);
      if (!existingStudent) {
        return res.status(404).send("Student not found");
      }

      // Update student fields
      existingStudent.name = name;
      existingStudent.email = email;

      // Only update password if it's provided (since password is hashed)
      if (password) {
        existingStudent.password = await bcrypt.hash(password, 10);
      }

      await existingStudent.save(); //saving the updated operations
      res.status(200).send("Student updated successfully.");
    } else {
      // Create new student
      const newStudent = new Student({ name, email, password });
      await newStudent.save(); // used for saving the data to the mongoDB
      res
        .status(201)
        .send("Thank you for signing up! Your data has been saved.");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send("Email already exists");
    } else if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send("Validation error: " + error.message);
    } else {
      console.error("Error saving data:", error);
      res.status(500).send("An error occurred: " + error.message);
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
