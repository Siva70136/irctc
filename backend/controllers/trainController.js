const { createTrain, getTrainsByRoute, updateSeats } = require('../models/Train');

const addTrain = async (req, res) => {
    const { train_name, source, destination, total_seats } = req.body;
    try {
        const train = await createTrain(train_name, source, destination, total_seats);
        res.status(201).json(train);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTrainAvailability = async (req, res) => {
    const { source, destination } = req.query;
    try {
        const trains = await getTrainsByRoute(source, destination);
        res.status(200).json(trains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const bookSeat = async (req, res) => {
    const { train_id } = req.body;
    try {
        const train = await updateSeats(train_id, train.available_seats - 1);
        res.status(200).json(train);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTrain, getTrainAvailability, bookSeat };
