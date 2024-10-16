const mongoose = require("mongoose");

// Define the Seat schema
const seatSchema = new mongoose.Schema({
  row_number: {
    type: Number,
    required: true,
  },
  seat_number: {
    type: Number,
    required: true,
  },
  is_booked: {
    type: Boolean,
    default: false,
  },
});

// Ensure the row_number and seat_number combination is unique
seatSchema.index({ row_number: 1, seat_number: 1 }, { unique: true });

module.exports = mongoose.model("Seat", seatSchema);
