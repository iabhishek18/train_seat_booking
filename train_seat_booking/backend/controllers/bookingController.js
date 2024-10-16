const Seat = require("../models/seat");

// Controller to get the seat status
exports.getSeatsStatus = async (req, res) => {
  try {
    // Fetch all seats from MongoDB, ordered by row_number and seat_number
    const seats = await Seat.find().sort({ row_number: 1, seat_number: 1 });

    // Format seats into an array of arrays (like a grid)
    const seatGrid = [];
    let row = [];

    seats.forEach((seat, index) => {
      row.push(seat.is_booked ? 1 : 0);
      if (
        seat.row_number !==
        (seats[index + 1] ? seats[index + 1].row_number : null)
      ) {
        seatGrid.push(row);
        row = [];
      }
    });

    res.json({ seats: seatGrid });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seats." });
  }
};

// Controller to book seats
exports.bookSeats = async (req, res) => {
  const { numSeats } = req.body;

  if (numSeats < 1 || numSeats > 7) {
    return res
      .status(400)
      .json({ error: "You can only book between 1 and 7 seats." });
  }

  try {
    // Find available seats by row, limiting to numSeats
    const seatsToBook = await Seat.find({ is_booked: false })
      .sort({ row_number: 1, seat_number: 1 })
      .limit(numSeats);

    if (seatsToBook.length < numSeats) {
      return res.status(400).json({ error: "Not enough seats available." });
    }

    // Book the seats
    const bookedSeats = [];
    for (let seat of seatsToBook) {
      seat.is_booked = true;
      await seat.save();
      bookedSeats.push({ row: seat.row_number, seat: seat.seat_number });
    }

    return res.json({ success: true, bookedSeats });
  } catch (error) {
    res.status(500).json({ error: "Failed to book seats." });
  }
};
