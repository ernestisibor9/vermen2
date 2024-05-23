const mongoose = require('mongoose');

// Create schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishedOn:{
        type: Date,
        required: true,
    },
    totalCopies:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Person',
    }
});

// Create model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;



