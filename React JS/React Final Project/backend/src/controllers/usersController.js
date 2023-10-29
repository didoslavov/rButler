const User = require('../models/User.js');
const Household = require('../models/Household.js');
const ResError = require('../utils/ResError.js');

const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken.js');
const mapError = require('../utils/mapError.js');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');

    if (!users?.length) {
        throw new ResError(404, 'Users not found!');
    }

    res.status(200).json(users);
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { errors } = validationResult(req);

    if (errors.length) {
        throw new ResError(400, errors.map(mapError));
    }

    const user = await User.findOne({ username }).populate({
        path: 'households.household',
        model: 'Household',
    });

    if (!user) {
        throw new ResError(401, "Username or password don't match!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ResError(401, "Username or password don't match!");
    }

    const token = createToken(user);
    const userData = { username: user.username, email: user.email, id: user._id, avatar: user.avatar, token };

    // res.cookie('Auth', token, { httpOnly: false, secure: false, sameSite: 'lax' });

    res.status(200).json({ userData });
});

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const file = req.file;

    const { errors } = validationResult(req);

    if (errors.length) {
        throw new ResError(400, errors.map(mapError));
    }

    const duplicatedUser = await User.findOne({ username }).lean();

    if (duplicatedUser) {
        throw new ResError(409, 'Username already in use!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { username, email, password: hashedPassword };

    if (file) {
        userObject.avatar = file;
    }

    const user = await User.create(userObject);

    if (!user) {
        throw new ResError(400, 'Invalid user data recieved!');
    }

    const token = createToken(user);
    const userData = { username: user.username, email: user.email, id: user._id, avatar: user.avatar, token };

    // res.cookie('token', token, { httpOnly: true, secure: false });

    res.status(201).json({ userData });
});

const logout = (req, res) => {
    // res.clearCookie('Auth', { sameSite: 'lax' });

    res.status(200).json({ success: 'Logged out successfully!' });
};

const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { username, email, avatar } = req.body;
    console.log(avatar);

    if (!userId) {
        throw new Error('User id is required!');
    }

    if (!username || !email) {
        throw new Error(400, 'All fields are required!');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ResError(400, 'User not found!');
    }

    const duplicatedUser = await User.findOne({ username }).lean().exec();

    if (duplicatedUser && duplicatedUser?._id.toString() !== userId) {
        throw new ResError(409, 'Username already in use!');
    }

    user.username = username;
    user.email = email;

    if (avatar) {
        user.avatar = avatar;
    }

    const userData = await user.save();

    res.json(200, { success: userData.username + ' updated successfully!', userData });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new ResError('User ID is required!');
    }

    const households = await Household.findOne({ master: id }).lean().exec();

    if (households) {
        throw new ResError(400, 'User is a master in a household! Assign another master to the household first!');
    }

    const user = await User.findById(id).exec();

    if (!user) {
        throw new ResError(400, 'User not found!');
    }

    const result = await user.deleteOne();

    res.status(200).json({ success: `User ${result.username} with ID: ${result.id} deleted!` });
});

module.exports = {
    getAllUsers,
    login,
    register,
    logout,
    updateUser,
    deleteUser,
};
