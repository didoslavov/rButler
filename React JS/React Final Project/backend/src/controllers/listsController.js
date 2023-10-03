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
    console.log(household);

    const listObject = { title, items, household, createdBy, type };
    const list = await List.create(listObject);

    const h = await Household.findOneAndUpdate({ _id: household }, { $push: { lists: list._id } });
    console.log(h);

    res.status(201).json({ message: `New list ${title} created!`, list });
});

module.exports = {
    getAllLists,
    createList,
};
