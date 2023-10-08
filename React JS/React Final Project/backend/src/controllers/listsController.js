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

const deleteList = asyncHandler(async (req, res) => {
    const { listId } = req.params;

    if (!listId) {
        return res.status(400).json({ message: 'List id is required!' });
    }

    const list = await List.findByIdAndDelete(listId);

    if (!list) {
        return res.status(400).json({ message: 'List not found!' });
    }

    await User.findOneAndUpdate({ _id: list.createdBy }, { $pull: { createdLists: listId } });
    await Household.findOneAndUpdate({ _id: list.household }, { $pull: { lists: listId } });

    return res.status(200).json({ message: 'List deleted successfully!' });
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

        const existingItem = list.items.findIndex((item) => item.text.toLowerCase() === text.toLowerCase());

        if (existingItem !== -1) {
            list.items[existingItem].qty += Number(qty);
        } else {
            list.items.push({ text, qty: Number(qty) });
        }
    } else if (list.type === 'todo') {
        if (!text) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (list.items.some((item) => item.text.toLowerCase() === text.toLowerCase())) {
            return res.status(409).json({ message: 'The todo is already listed!' });
        }

        list.items.push({ text });
    } else {
        return res.status(400).json({ message: 'Invalid list type!' });
    }

    const updatedList = await list.save();

    res.status(201).json(updatedList);
});

const deleteItem = asyncHandler(async (req, res) => {
    const { listId, itemId } = req.params;

    const updatedList = await List.findOneAndUpdate({ _id: listId }, { $pull: { items: { _id: itemId } } }, { new: true });

    if (!updatedList) {
        return res.status(400).json({ message: 'List not found' });
    }

    res.status(200).json(updatedList);
});

module.exports = {
    getAllLists,
    getListById,
    deleteList,
    addItem,
    deleteItem,
    createList,
};
