import { del, get, patch, post } from '../api/requester.js';

export const getAllHouseholds = async (query = '') => {
    return await get(`/households?search=${query}`);
};

export const getUserHouseholds = async (userId) => {
    return await get('/households/' + userId + '/user-households');
};

export const createHousehold = async (household) => {
    return await post('/households/create', household);
};

export const getUserHouseholdById = async (id) => {
    return await get('/households/' + id);
};

export const addUserToHousehold = async (user, householdId) => {
    return await post('/households/' + householdId + '/add-member', user);
};

export const removeUserFromHousehold = async (user, householdId) => {
    return await post('/households/' + householdId + '/remove-member', user);
};

export const deleteHousehold = async (householdId, token) => {
    //TODO: You can try implement Redis DB. You can get deleted household in the request and store it in Redis DB for if user decides to undo deletion

    return await del('/households/' + householdId + '/delete');
};

export const updateHousehold = async (household, householdId) => {
    return await patch('/households/' + householdId + '/update', household);
};
