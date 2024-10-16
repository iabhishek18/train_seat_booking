import React from "react";
import SeatBooking from "./components/SeatBooking"; // Import the SeatBooking component

function App() {
  return (
    <div>
      <header style={{ textAlign: "center", margin: "20px" }}>
        <h1>Train Seat Booking System</h1>
      </header>
      <SeatBooking /> {/* Render the seat booking component */}
    </div>
  );
}

export default App;
