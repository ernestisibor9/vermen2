const express = require('express');
// const { addNewUser, loginUser} = require('../controller/userController');
const { addNewPerson, loginPerson, fetchAllPersons, loggedInPerson, fetchSinglePerson } = require('../controller/personController');
const authMiddleware = require('../middleware/authMiddleware');

const route = express.Router();

// All routes
route.post('/addperson', addNewPerson)
route.post('/login', loginPerson)
route.get('/allpersons', fetchAllPersons)
route.get('/fetchsingleuser/:id', fetchSinglePerson)
route.get('/loginperson', authMiddleware, loggedInPerson)
// route.put('/updateuser/:id', updateUser)
// route.delete('/deleteuser/:id', deleteUser)

module.exports = route;