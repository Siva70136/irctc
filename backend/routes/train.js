const express = require('express');
const { Train } = require('../models');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/add-train', [authenticate, authorizeAdmin], async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;
  //console.log(req.body);
  const train = await Train.create({
    train_name,
    source,
    destination,
    total_seats,
    available_seats: total_seats
  });
  res.status(201).json(train);
});

router.get('/seat-availability', authenticate, async (req, res) => {
  const { source, destination } = req.query;
  console.log(req.query);
  const trains = await Train.findAll({ where: { source, destination } });
  res.json(trains);
});

module.exports = router;
