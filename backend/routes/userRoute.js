const express = require('express');
const { addNewUser, loginUser, fetchAllUsers, fetchSingleUser, updateUser, deleteUser } = require('../controller/userController');
const route = express.Router();

// All routes
route.post('/register', addNewUser)
route.post('/login', loginUser)
route.get('/allusers', fetchAllUsers)
route.get('/fetchsingleuser/:id', fetchSingleUser)
route.put('/updateuser/:id', updateUser)
route.delete('/deleteuser/:id', deleteUser)

module.exports = route;