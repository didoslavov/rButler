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

    res.status(200).json(lists);
});

const getListById = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const list = await List.findById(listId);

    res.status(200).json(list);
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

const addItem = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const { text, qty } = req.body;

    const list = await List.findById(listId);

    if (!list) {
        return res.status(400).json({ message: 'List not found!' });
    }

    if (list.type === 'shopping') {
        if (!text || !qty) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        list.items.push({ text, qty: Number(qty) });
    } else if (list.type === 'todo') {
        if (!text) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        list.items.push({ text });
    } else {
        return res.status(400).json({ message: 'Invalid list type!' });
    }

    const updatedList = await list.save();

    res.status(201).json(updatedList);
});

module.exports = {
    getAllLists,
    getListById,
    addItem,
    createList,
};
