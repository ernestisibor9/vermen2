const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add new users to the database
const addNewUser = async (req, res) => {
  // Destructure the schema or field
  const { name, email, password, phone, age } = req.body;

  try {
    // Check if the user's email already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const addUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      age: age,
    });
    res.status(201).json({
      success: true,
      message: "User added successfully",
      addUser: addUser,
    });
  } catch (err) {
    console.log(err);
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    // Generate the token
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userExist,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

// Fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// Fetch single user
const fetchSingleUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  // Extract the token
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken) {
    return res.status(404).json({ message: "token not found" });
  }
  // verify the token
  const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);

  if(!decodedToken){
    return res.status(404).json({message: 'token is not valid'});
}

  try {
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error("User not found");
    }
    const updateSingleUser = await User.findByIdAndUpdate(decodedToken.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updateSingleUser: updateSingleUser,
      id: decodedToken.id
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const deleteOneUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deleteOneUser: deleteOneUser,
    });
  } catch (error) {}
};

module.exports = {
  addNewUser,
  loginUser,
  fetchAllUsers,
  fetchSingleUser,
  updateUser,
  deleteUser,
};
