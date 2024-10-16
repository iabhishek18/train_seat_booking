const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookingRoutes = require("./routes/bookingRoutes");
const dotenv = require('dotenv');
require('dotenv').config();



// Create the Express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string
const dbURI = process.env.MONGO_URI;


// Connect to MongoDB using Mongoose
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log("Database connection error: " + err));

// Import booking routes
app.use("/api/bookings", bookingRoutes);
