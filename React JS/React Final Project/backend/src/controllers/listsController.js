const Household = require('../models/Household.js');
const List = require('../models/List.js');
const User = require('../models/User.js');

const asyncHandler = require('express-async-handler');

const getAllLists = asyncHandler(async (req, res) => {
    const lists = await List.find()
        .populate({
            path: 'households users',
            populate: {
                path: 'users.user',
            },
        })
        .exec();

    console.log(lists);
});

const createList = asyncHandler(async (req, res) => {
    const { title, items, household, createdBy, type } = req.body;

    if (!title || !household || !createdBy || !type) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const duplicate = await List.findOne({ title });

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate list title!' });
    }

    const listObject = { title, items, household, createdBy, type };
    const list = await List.create(listObject);

    await Household.findOneAndUpdate({ _id: household }, { $push: { lists: list._id } });
    await User.findOneAndUpdate({ _id: createdBy }, { $push: { createdLists: list._id } });

    res.status(201).json(list);
});

module.exports = {
    getAllLists,
    createList,
};
