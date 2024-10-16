import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeatBooking.css"; // Import the CSS file

const SeatBooking = () => {
  const [numSeats, setNumSeats] = useState(1);
  const [seatsStatus, setSeatsStatus] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [error, setError] = useState("");

  // Fetch seat status from the backend
  const fetchSeatsStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/bookings/status"
      );
      setSeatsStatus(response.data.seats);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle seat booking
  const handleBookSeats = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/book",
        {
          numSeats: parseInt(numSeats),
        }
      );
      setBookedSeats(response.data.bookedSeats);
      setError("");
      fetchSeatsStatus();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchSeatsStatus();
  }, []);

  return (
    <div className="booking-container">
      <h2>Train Seat Booking</h2>
      <div className="input-container">
        <label htmlFor="seats">Enter number of seats (1-7):</label>
        <input
          type="number"
          min="1"
          max="7"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
          id="seats"
        />
        <button className="book-btn" onClick={handleBookSeats}>
          Book Seats
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {bookedSeats.length > 0 && (
        <div className="booked-seats">
          <h3>Seats Booked:</h3>
          <ul>
            {bookedSeats.map((seat, index) => (
              <li key={index}>{`Row ${seat.row} Seat ${seat.seat}`}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Seat Status</h3>
      <div className="seats-grid">
        {seatsStatus.length > 0 &&
          seatsStatus.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`seat ${seat === 0 ? "available" : "booked"}`}
                  data-seat={`Row ${rowIndex + 1} Seat ${seatIndex + 1}`}
                >
                  {seat === 0 ? "A" : "B"}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeatBooking;
