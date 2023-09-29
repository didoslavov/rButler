const Household = require('../models/Household.js');
const User = require('../models/User.js');

const asyncHandler = require('express-async-handler');

const getAllHouseholds = asyncHandler(async (req, res) => {
    const households = await Household.find().populate('users').lean();

    if (!households?.length) {
        return res.status(400).json({ message: 'No households found!' });
    }

    const householdWithMasterAdded = await Promise.all(
        households.map(async (household) => {
            const user = await User.findById(household.master).lean().exec();

            return {
                ...household,
                master: user._id,
            };
        })
    );

    res.status(200).json(householdWithMasterAdded);
});

const getHouseholdById = asyncHandler(async (req, res) => {
    const { householdId } = req.params;

    const household = await Household.findById(householdId);

    if (!household) {
        return res.status(400).json({ message: 'No household found!' });
    }

    res.status(200).json(household);
});

const getUserHouseholds = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const userHouseholds = await Household.find({
        'users.user': userId,
    });

    res.status(200).json(userHouseholds);
});

const createHouseholds = asyncHandler(async (req, res) => {
    const { master, name, presentation } = req.body;

    if (!master || !name || !presentation) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const duplicatedHousehold = await Household.findOne({ name }).lean().exec();

    if (duplicatedHousehold) {
        return res.status(400).json({ message: 'Duplicated household name!' });
    }

    const householdObject = { master, name, presentation };
    const household = await Household.create(householdObject);

    if (household) {
        const user = await User.findById(master).exec();

        if (user) {
            user.households.push({ household: household._id, role: 'Master' });
            household.users.push({ user: user._id, role: 'Master' });
            await household.save();
            await user.save();
        }

        res.status(201).json({ message: `New household ${name} created!` });
    } else {
        res.status(400).json({ message: 'Invalid household data!' });
    }
});

const addHouseholdMember = asyncHandler(async (req, res) => {
    const { username, role, householdId } = req.body;

    if (!username || !role) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const household = await Household.findById(householdId);

    if (!household) {
        return res.status(400).json({ message: 'Household not found!' });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'User not found!' });
    }

    household.users.push({ user: user._id, role });
    user.households.push({ household: household._id, role });

    const householdWithAddedUser = await household.save();
    await user.save();

    res.status(200).json(householdWithAddedUser);
});

const updateHouseholds = asyncHandler(async (req, res) => {
    const { id, master, name, presentation } = req.body;

    if (!id || !name || !presentation) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const household = await Household.findById(id).exec();

    if (!household) {
        return res.status(400).json({ message: 'Household not found!' });
    }

    const duplicatedHousehold = await User.findOne({ name }).lean().exec();

    if (duplicatedHousehold && duplicatedHousehold?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate household!' });
    }

    household.master = master;
    household.name = name;
    household.presentation = presentation;

    const updatedHousehold = await household.save();

    res.json({ message: updatedHousehold.name + ' updated successfully!' });
});

const deleteHouseholds = asyncHandler(async (req, res) => {
    const { householdId } = req.params;

    if (!householdId) {
        res.status(400).json({ message: 'Household ID is required!' });
    }

    const result = await Household.findByIdAndDelete(householdId);

    //TODO: Implement Redis DB. You can return deleted household and store it in Redis DB for if user decides to undo deletion
    res.status(200).json({ message: `Household ${result.name} with ID: ${result._id} deleted!` });
});

module.exports = {
    getAllHouseholds,
    getUserHouseholds,
    getHouseholdById,
    createHouseholds,
    addHouseholdMember,
    updateHouseholds,
    deleteHouseholds,
};
