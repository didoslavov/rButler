const Household = require('../models/Household.js');
const User = require('../models/User.js');
const ResError = require('../utils/ResError.js');

const asyncHandler = require('express-async-handler');

const getAllHouseholds = asyncHandler(async (req, res) => {
    const { search } = req.query;
    const households = await Household.find({
        name: {
            $regex: new RegExp(search),
            $options: 'i',
        },
    }).populate('users.user master', '-password');

    res.status(200).json(households);
});

const getHouseholdById = asyncHandler(async (req, res) => {
    const { householdId } = req.params;

    if (!householdId) {
        throw new ResError(400, 'Household ID is required!');
    }

    const household = await Household.findById(householdId).populate([
        { path: 'lists' },
        { path: 'users.user', select: ['username', '_id'] },
    ]);

    if (!household) {
        throw new ResError(404, 'No household found!');
    }

    res.status(200).json(household);
});

const getUserHouseholds = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const userHouseholds = await Household.find({
        'users.user': userId,
    }).populate('users.user master', '-password');

    if (!userHouseholds) {
        throw new ResError(404, 'No household found!');
    }

    res.status(200).json(userHouseholds);
});

const createHouseholds = asyncHandler(async (req, res) => {
    const { master, name, presentation } = req.body;

    if (!master || !name || !presentation) {
        throw new ResError(400, 'All fields are required!');
    }

    const householdObject = { master, name, presentation };
    const household = await Household.create(householdObject);

    const user = await User.findOneAndUpdate(
        { _id: master },
        { $push: { households: { household: household._id, role: 'Master' } } },
        { new: true }
    );

    if (!user) {
        throw new ResError(404, 'User not found!');
    }

    const updatedHousehold = await Household.findByIdAndUpdate(
        { _id: household._id },
        { $push: { users: { user: user._id, role: 'Master' } } },
        { new: true }
    );

    if (!updatedHousehold) {
        throw new ResError(404, 'Household not found!');
    }

    res.status(201).json({ message: `New household ${name} created!` });
});

const addHouseholdMember = asyncHandler(async (req, res) => {
    const { username, role } = req.body;
    const { householdId } = req.params;

    if (!householdId) {
        throw new ResError(400, 'Household ID is required!');
    }

    if (!username || !role) {
        throw new ResError(400, 'All fields are required!');
    }

    const user = await User.findOneAndUpdate(
        { username: username, 'households.household': { $ne: householdId } },
        { $push: { households: { household: householdId, role: role } } },
        { new: true }
    );

    if (!user) {
        throw new ResError(409, `${username} doesn't exists or is already a member of the household!`);
    }

    const household = await Household.findOneAndUpdate(
        {
            _id: householdId,
            'users.user': { $ne: user._id },
        },
        { $push: { users: { user: user._id, role: role } } },
        { new: true }
    ).populate({ path: 'users.user', select: ['username', '_id', 'role'] });

    if (!household) {
        throw new ResError(409, `${username} is already a member of the household`);
    }

    res.status(200).json(household);
});

const removeHouseholdMember = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const { householdId } = req.params;

    if (!householdId) {
        throw new ResError(400, 'Household ID is required!');
    }

    if (!username) {
        throw new ResError(400, 'All fields are required!');
    }

    const user = await User.findOneAndUpdate(
        { username: username },
        { $pull: { households: { household: householdId } } },
        { new: true }
    );

    if (!user) {
        throw new ResError(409, `${username} is not a member of the household!`);
    }

    const household = await Household.findOneAndUpdate(
        {
            _id: householdId,
        },
        { $pull: { users: { user: user._id } } },
        { new: true }
    );

    if (!household) {
        throw new ResError(409, `${username} is not a member of the household!`);
    }

    res.status(200).json(household);
});

const updateHouseholds = asyncHandler(async (req, res) => {
    const { name, presentation } = req.body;
    const { householdId } = req.params;

    if (!householdId) {
        throw new ResError(400, 'Household ID is required!');
    }

    if (!name || !presentation) {
        throw new ResError(400, 'All fields are required!');
    }

    const updatedHousehold = await Household.findByIdAndUpdate(householdId, { name, presentation });

    if (!updatedHousehold) {
        throw new ResError(404, 'Household not found!');
    }

    res.json({ success: updatedHousehold.name + ' updated successfully!' });
});

const deleteHouseholds = asyncHandler(async (req, res) => {
    const { householdId } = req.params;

    if (!householdId) {
        throw new ResError(400, 'Household ID is required!');
    }

    const deletedHousehold = await Household.findByIdAndDelete(householdId).lean();

    if (!deletedHousehold) {
        throw new ResError(404, 'Household not found!');
    }

    const userIds = deletedHousehold.users.map((user) => user.user);

    await User.updateMany({ _id: { $in: userIds } }, { $pull: { households: { household: householdId } } });

    //TODO: Implement Redis DB. You can return deleted household and store it in Redis DB for if user decides to undo deletion
    res.status(200).json({ message: `Household ${deletedHousehold.name} with ID: ${deletedHousehold._id} deleted!` });
});

module.exports = {
    getAllHouseholds,
    getUserHouseholds,
    getHouseholdById,
    createHouseholds,
    updateHouseholds,
    addHouseholdMember,
    removeHouseholdMember,
    updateHouseholds,
    deleteHouseholds,
};
