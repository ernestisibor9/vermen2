const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addBook, updateBook, deleteBook, getOneBook, getAllBooks } = require('../controller/bookController');
const route = express.Router();

// All routes
route.post('/addbook', authMiddleware, addBook)
route.put('/updatebook/:id', authMiddleware, updateBook)
route.delete('/deletebook/:id', authMiddleware, deleteBook)
route.get('/getonebook/:id', authMiddleware, getOneBook)
route.get('/getallbooks', authMiddleware, getAllBooks)

module.exports = route;