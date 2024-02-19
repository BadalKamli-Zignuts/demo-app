// Importing required helper functions and models
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const UserModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

/* REGISTER CONTROLLER */
const registerController = async (req, res) => {
  try {
    // Extracting user information from the request body
    const { name, email, password, phone, address } = req.body;

    // Validation checks for required fields
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered. Please log in.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save user info in the database
    const user = await new UserModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(
      `Error in /server/controllers/authcontroller --> registerController: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Registration failed. Please try again.",
      error,
    });
  }
};

/* LOGIN CONTROLLER */
const loginController = async (req, res) => {
  try {
    // Extracting user credentials from the request body
    const { email, password } = req.body;

    // Validation checks
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password. Please provide both.",
      });
    }

    // Get the user from the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Compare the password
    const hashedpassword = user.password;
    const match = await comparePassword(password, hashedpassword);

    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(
      `Error in /server/controllers/authcontroller --> loginController: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Login failed. Please try again.",
      error,
    });
  }
};

/* TEST CONTROLLER */
const testController = async (req, res) => {
  try {
    res.send("Protected route");
  } catch (error) {
    console.log(
      `Error in /server/controllers/authControllers --> testController fn : ${error}`
    );
    res.send({ error });
  }
};


// Exporting the controllers for use in the application
module.exports = {
  registerController,
  loginController,
  testController,
};
