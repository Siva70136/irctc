const { createUser, findUserByUsername } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = await createUser(username, password, role);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, loginUser };
