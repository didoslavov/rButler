const Household = require('../models/Household.js');
const User = require('../models/User.js');

const asyncHandler = require('express-async-handler');

const getAllHouseholds = asyncHandler(async (req, res) => {
    const households = await Household.find().lean();

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

    res.json(householdWithMasterAdded);
});

const createHouseholds = asyncHandler(async (req, res) => {
    const { master, name, presentation } = req.body;

    if (!master || !name || !presentation) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const duplicatedHousehold = await User.findOne({ name }).lean().exec();

    if (duplicatedHousehold) {
        return res.status(400).json({ message: 'Duplicated household name!' });
    }

    const householdObject = { master, name, presentation };
    const household = Household.create(householdObject);

    if (household) {
        res.status(201).json({ message: `New household ${name} created!` });
    } else {
        res.status(400).json({ message: 'Invalid household data!' });
    }
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
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: 'Household ID is required!' });
    }

    const household = await Household.findById(id).exec();

    if (!household) {
        return res.status(400).json({ message: 'Household not found!' });
    }

    const result = await household.deleteOne();
    const reply = `Household ${result.name} with ID: ${result._id} deleted!`;

    res.json(reply);
});

module.exports = {
    getAllHouseholds,
    createHouseholds,
    updateHouseholds,
    deleteHouseholds,
};
