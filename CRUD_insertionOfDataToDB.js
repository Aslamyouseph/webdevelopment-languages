const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const validator = require("validator");
const connectDB = require("./CURD_connectionToDB"); // Import connection file  to create a connection
const mongoose = require("mongoose"); // here we import mongoose ones again

const app = express();

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// Security middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

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

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "CRUD_form.html"));
});

// Handle form submission and data insertion
app.post("/signupSubmit", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Additional server-side validation
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      throw new Error("Name must be between 3 and 20 characters");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validator.isStrongPassword(password)) {
      // try this password to successfully store the data in MongoDB: Giraffe#LemonTree88!
      throw new Error("Password is not strong enough");
    }

    const newStudent = new Student({ name, email, password });
    await newStudent.save();

    res.status(201).send("Thank you for signing up! Your data has been saved.");
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
