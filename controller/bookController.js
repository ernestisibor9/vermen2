const express = require('express')
const Book = require('../model/Book')

const addBook = async(req, res) =>{
    try{
        const book = new Book(req.body)
        await book.save()
        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book: book
        })
    }catch(err){
        res.status(500).json(err);
    }
}

// Update book
const updateBook = async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findByIdAndUpdate({id: id}, req.body, {new: true, runValidators: true});
      if (!book) {
        throw new Error("Book not found");
      }
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        user: user,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // Delete book
  const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        throw new Error("Book not found");
      }
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {}
  };

  // Get single book
  const getOneBook = async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findById(id);
      if (!book) {
        throw new Error("Book not found");
      }
      res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        book: book,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // Get all books
  const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        books: books,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

module.exports = {addBook, updateBook, deleteBook, getOneBook, getAllBooks}