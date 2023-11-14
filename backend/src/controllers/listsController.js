const Household = require('../models/Household.js');
const List = require('../models/List.js');
const User = require('../models/User.js');
const ResError = require('../utils/ResError.js');

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

    if (!lists) {
        throw new ResError(404, 'No lists found!');
    }

    res.status(200).json(lists);
});

const getListById = asyncHandler(async (req, res) => {
    const { listId } = req.params;

    if (!listId) {
        throw new ResError(400, 'List ID is required!');
    }
    const list = await List.findById(listId);

    if (!list) {
        throw new ResError(404, 'List not found!');
    }

    res.status(200).json(list);
});

const createList = asyncHandler(async (req, res) => {
    const { title, items, household, createdBy, type } = req.body;

    if (!title || !household || !createdBy || !type) {
        throw new ResError(400, 'All fields are required!');
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
        throw new ResError(400, 'List ID is required!');
    }

    const list = await List.findByIdAndDelete(listId);

    if (!list) {
        throw new ResError(404, 'List not found!');
    }

    await User.findOneAndUpdate({ _id: list.createdBy }, { $pull: { createdLists: listId } });
    await Household.findOneAndUpdate({ _id: list.household }, { $pull: { lists: listId } });

    return res.status(200).json({ message: 'List deleted successfully!' });
});

const addItem = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const { text, qty } = req.body;

    if (!listId) {
        throw new ResError(400, 'List ID is required!');
    }

    const list = await List.findById(listId);

    if (!list) {
        throw new ResError(404, 'List not found!');
    }

    if (list.type === 'shopping') {
        if (!text || !qty) {
            throw new ResError(400, 'All fields are required!');
        }

        const existingItem = list.items.findIndex((item) => item.text.toLowerCase() === text.toLowerCase());

        if (existingItem !== -1) {
            list.items[existingItem].qty += Number(qty);
        } else {
            list.items.push({ text, qty: Number(qty) });
        }
    } else if (list.type === 'todo') {
        if (!text) {
            throw new ResError(400, 'All fields are required!');
        }

        if (list.items.some((item) => item.text.toLowerCase() === text.toLowerCase())) {
            throw new ResError(409, 'Todo is already listed!');
        }

        list.items.push({ text });
    } else {
        throw new ResError(400, 'Invalid list type!');
    }

    const updatedList = await list.save();

    res.status(201).json(updatedList);
});

const deleteItem = asyncHandler(async (req, res) => {
    const { listId, itemId } = req.params;

    if (!listId || !itemId) {
        throw new ResError(400, 'List and Item IDs are required!');
    }

    const updatedList = await List.findOneAndUpdate({ _id: listId }, { $pull: { items: { _id: itemId } } }, { new: true });

    if (!updatedList) {
        throw new ResError('List not found');
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
