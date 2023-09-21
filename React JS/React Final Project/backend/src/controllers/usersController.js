const User = require('../models/User.js');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const duplicateUser = await User.findOne({ username }).lean();
    console.log(duplicateUser);
    if (duplicateUser) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { username, password: hashedPassword };

    const user = User.create(userObject);

    if (user) {
        res.status(201).json({ message: `New user ${username} created!` });
    } else {
        res.status(400).json({ message: 'Invalid user data recieved!' });
    }
});

module.exports = {
    createUser,
};
