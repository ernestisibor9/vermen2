const express = require('express');
const app = express();
const dbConnection = require('./config/dbConnect');
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./routes/userRoute')
const personRoute = require('./routes/personRoute')
const bookRoute = require('./routes/bookRoute')
const cors = require('cors')


let PORT = process.env.PORT || 5000

// Connect to the database
dbConnection()

// Middleware
app.use(express.json())
app.use(cors())
app.use('/api/user', userRoute)
app.use('/api/person', personRoute)
app.use('/api/book', bookRoute)


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})