class Coach {
  constructor() {
    // Initialize the coach with 80 seats (11 rows of 7 and 1 row of 3)
    this.seats = [
      [0, 0, 0, 0, 0, 0, 0], // Row 1
      [0, 0, 0, 0, 0, 0, 0], // Row 2
      [0, 0, 0, 0, 0, 0, 0], // Row 3
      [0, 0, 0, 0, 0, 0, 0], // Row 4
      [0, 0, 0, 0, 0, 0, 0], // Row 5
      [0, 0, 0, 0, 0, 0, 0], // Row 6
      [0, 0, 0, 0, 0, 0, 0], // Row 7
      [0, 0, 0, 0, 0, 0, 0], // Row 8
      [0, 0, 0, 0, 0, 0, 0], // Row 9
      [0, 0, 0, 0, 0, 0, 0], // Row 10
      [0, 0, 0, 0, 0, 0, 0], // Row 11
      [0, 0, 0], // Row 12 (3 seats)
    ];
  }

  getAvailableSeats() {
    return this.seats;
  }

  // Try to book seats in a row
  bookSeatsInRow(numSeats) {
    for (let i = 0; i < this.seats.length; i++) {
      const availableSeats = this.seats[i].filter((seat) => seat === 0).length;
      if (availableSeats >= numSeats) {
        const bookedSeats = [];
        for (
          let j = 0;
          j < this.seats[i].length && bookedSeats.length < numSeats;
          j++
        ) {
          if (this.seats[i][j] === 0) {
            this.seats[i][j] = 1;
            bookedSeats.push({ row: i + 1, seat: j + 1 });
          }
        }
        return bookedSeats;
      }
    }
    return [];
  }

  // Book nearby seats across multiple rows if no full row is available
  bookNearbySeats(numSeats) {
    const bookedSeats = [];
    for (
      let i = 0;
      i < this.seats.length && bookedSeats.length < numSeats;
      i++
    ) {
      for (
        let j = 0;
        j < this.seats[i].length && bookedSeats.length < numSeats;
        j++
      ) {
        if (this.seats[i][j] === 0) {
          this.seats[i][j] = 1;
          bookedSeats.push({ row: i + 1, seat: j + 1 });
        }
      }
    }
    return bookedSeats;
  }

  isCoachFull() {
    return this.seats.flat().every((seat) => seat === 1);
  }
}

module.exports = new Coach();
