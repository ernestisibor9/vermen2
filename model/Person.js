const mongoose = require('mongoose');

// Create schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'patron',
    },
    status:{
        type: String,
        default: 'pending',
    },
},
{
    timestamps: true,
}

);

// Create model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;



