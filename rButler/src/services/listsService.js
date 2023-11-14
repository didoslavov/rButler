import { del, get, post } from '../api/requester.js';
import { listsEndpoints } from '../api/endpoints.js';

export const getListById = async (id) => {
    return await get(listsEndpoints.getListById + id);
};

export const createList = async (list) => {
    return await post(listsEndpoints.createList, list);
};

export const removeList = async (listId) => {
    return await del(listsEndpoints.removeList(listId));
};

export const addListItem = async (listId, listItem) => {
    return await post(listsEndpoints.addListItem(listId), listItem);
};

export const removeListItem = async (itemId, listId) => {
    return await del(listsEndpoints.removeListItem(listId) + itemId);
};
