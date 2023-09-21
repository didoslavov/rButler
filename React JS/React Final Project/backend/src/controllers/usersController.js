const User = require('../models/User.js');
const Household = require('../models/Household.js');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found!' }).lean();
    }

    res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const duplicatedUser = await User.findOne({ username }).lean();

    if (duplicatedUser) {
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

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email } = req.body;

    if (!id || !username || !email) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found!' });
    }

    const duplicatedUser = await User.findOne({ username }).lean().exec();

    if (duplicatedUser && duplicatedUser?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate user!' });
    }

    user.username = username;
    user.email = email;

    const updatedUser = await user.save();

    res.json({ message: updatedUser.username + ' updated successfully!' });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID required!' });
    }

    const households = await Household.findOne({ master: id }).lean().exec();

    if (households) {
        return res
            .status(400)
            .json({ message: 'User is a master in a household! Assign another master to the household first!' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found!' });
    }

    const result = await user.deleteOne();
    const reply = `User ${result.username} with ID: ${result.id} deleted!`;

    res.json(reply);
});

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
