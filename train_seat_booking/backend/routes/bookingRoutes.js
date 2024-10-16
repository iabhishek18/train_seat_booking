const express = require("express");
const {
  bookSeats,
  getSeatsStatus,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", bookSeats);
router.get("/status", getSeatsStatus);

module.exports = router;
