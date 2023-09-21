const User = require('../models/User.js');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password, roles } = req.body;

    if (!username || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required!' });
    }
});

module.exports = {
    createUser,
};
