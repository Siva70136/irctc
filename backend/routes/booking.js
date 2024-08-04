const express = require('express');
const { Booking, Train } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/book-seat', authenticate, async (req, res) => {
  const { userId } = req.user;
  const { train_id } = req.body;

  const train = await Train.findByPk(train_id);
  if (train.available_seats > 0) {
    const booking = await Booking.create({
      user_id: userId,
      train_id,
      seat_number: train.total_seats - train.available_seats + 1
    });
    train.available_seats -= 1;
    await train.save();
    res.status(201).json(booking);
  } else {
    res.status(400).json({ msg: 'No seats available' });
  }
});

router.get('/booking-details', authenticate, async (req, res) => {
  const { userId } = req.user;
  const bookings = await Booking.findAll({ where: { user_id: userId } });
  res.json(bookings);
});

module.exports = router;
