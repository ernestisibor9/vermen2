const mongoose = require("mongoose");

// Create a function to hold my connection
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;
