const User = require('../models/User.js');
const Household = require('../models/Household.js');

const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken.js');
const mapError = require('../utils/mapError.js');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');

    if (!users?.length) {
        return res.status(404).json({ message: 'Users not found!' });
    }

    res.json(users);
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const { errors } = validationResult(req);

    if (errors.length) {
        return res.status(400).json({ errors: errors.map(mapError) });
    }

    const user = await User.findOne({ username }).populate({
        path: 'households.household',
        model: 'Household',
    });

    if (!user) {
        return res.status(401).json({ errors: ["Username or password don't match!"] });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ errors: ["Username or password don't match!"] });
    }

    const token = createToken(user);
    const userData = { username: user.username, email: user.email, id: user._id, token };

    // res.cookie('Auth', token, { httpOnly: false, secure: false, sameSite: 'lax' });

    res.status(200).json({ success: ['Logged in successfully'], userData });
});

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const { errors } = validationResult(req);

    if (errors.length) {
        return res.status(400).json({ errors: errors.map(mapError) });
    }

    const duplicatedUser = await User.findOne({ username }).lean();

    if (duplicatedUser) {
        return res.status(409).json({ error: ['User already in use!'] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { username, email, password: hashedPassword };

    const user = await User.create(userObject);

    if (!user) {
        return res.status(400).json({ errors: ['Invalid user data recieved!'] });
    }

    const token = createToken(user);
    const userData = { username: user.username, email: user.email, id: user._id, token };

    // res.cookie('token', token, { httpOnly: true, secure: false });

    res.status(201).json({ success: [`New user ${username} created!`], userData });
});

const logout = (req, res) => {
    // res.clearCookie('Auth', { sameSite: 'lax' });

    res.status(200).json({ success: 'Logged out successfully!' });
};

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
    login,
    register,
    logout,
    updateUser,
    deleteUser,
};
