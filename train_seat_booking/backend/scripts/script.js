const mongoose = require("mongoose");
const Seat = require("../models/seat");
const dotenv = require('dotenv');
require('dotenv').config();

// Replace with your MongoDB connection string
const dbURI = "mongodb+srv://mishraabhishek1810:abhi123@cluster0.6sl6o.mongodb.net";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");

    // Clear existing seats (if any)
    await Seat.deleteMany();

    // Insert 77 seats (11 rows of 7 seats)
    const seats = [];
    for (let row = 1; row <= 11; row++) {
      for (let seat = 1; seat <= 7; seat++) {
        seats.push({ row_number: row, seat_number: seat });
      }
    }

    // Insert the last row with 3 seats
    seats.push({ row_number: 12, seat_number: 1 });
    seats.push({ row_number: 12, seat_number: 2 });
    seats.push({ row_number: 12, seat_number: 3 });

    // Save the seats to MongoDB
    await Seat.insertMany(seats);
    console.log("Seats successfully seeded.");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding seats: ", err);
    mongoose.connection.close();
  });
