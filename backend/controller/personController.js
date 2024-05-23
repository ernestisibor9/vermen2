const express = require("express");
const Person = require("../model/Person");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add new Persons to the database
const addNewPerson = async (req, res) => {

  try {
    // Check if the Person's email already exists
    const PersonExists = await Person.findOne({ email: req.body.email });
    if (PersonExists) {
      return res.json(
        {
          success: false,
          message: "Person already exists",
        }
      );
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword
    // Create a new Person
    const addPerson = new Person(req.body);
    await addPerson.save();
    res.status(201).json({
      success: true,
      message: "Person added successfully",
      addPerson: addPerson,
    });
  } catch (err) {
    console.log(err);
  }
};

// // Login Person
const loginPerson = async (req, res) => {
  const { email, password } = req.body;

  try {
    const PersonExist = await Person.findOne({ email: email });
    if (!PersonExist) {
      return res.json({ message: "Person does not exist" });
    }
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, PersonExist.password);
    if (!isMatch) {
      return res.json({ message: "Password is incorrect" });
    }
    // Generate the token
    const token = jwt.sign({ userId: PersonExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "Person logged in successfully",
      Person: PersonExist,
      data: token,
    });
  } catch (err) {
    console.log(err);
  }
};


// Fetch all persons
const fetchAllPersons = async (req, res) => {
  try {
    const person = await Person.find();
    res.status(200).json({
      success: true,
      message: "Persons fetched successfully",
      person: person,
    });
  } catch (err) {
    console.log(err);
  }
};

// Fetch single user
const fetchSinglePerson = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await Person.findById(id);
    if (!user) {
      throw new Error("Person not found");
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

// Get the details of the logged in person
const loggedInPerson = async (req, res) => {

  try {
    const person = await Person.findById(req.body.userId );
    if (!person) {
      throw new Error("Person not found");
    }
    res.status(200).json({
      success: true,
      message: "Person fetched successfully",
      person: person,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
  addNewPerson,
  loginPerson,
  fetchAllPersons,
  fetchSinglePerson,
  loggedInPerson,
//   updatePerson,
//   deletePerson,
};
