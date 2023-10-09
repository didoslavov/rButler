import { del, get, post } from '../api/requester.js';

export const getListById = async (id) => {
    return await get('/lists/' + id);
};

export const createList = async (list) => {
    return await post('/lists/create', list);
};

export const removeList = async (id) => {
    return await del('/lists/' + id + '/delete');
};

export const addListItem = async (id, listItem) => {
    return await post('/lists/' + id + '/add-item', listItem);
};

export const removeListItem = async (itemId, listId, token) => {
    return await del('/lists/' + listId + '/delete-item/' + itemId);
};
