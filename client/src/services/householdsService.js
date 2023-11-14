import { del, get, patch, post } from '../api/requester.js';
import { householdEndpoints } from '../api/endpoints.js';

export const getAllHouseholds = async (query = '') => {
    return await get(householdEndpoints.getAllHouseholds(query));
};

export const getUserHouseholds = async (userId) => {
    return await get(householdEndpoints.getUserHouseholds(userId));
};

export const createHousehold = async (household) => {
    return await post(householdEndpoints.createHousehold, household);
};

export const getUserHouseholdById = async (userId) => {
    return await get(householdEndpoints.getUserHouseholdById + userId);
};

export const addUserToHousehold = async (user, householdId) => {
    return await post(householdEndpoints.addUserToHousehold(householdId), user);
};

export const removeUserFromHousehold = async (user, householdId) => {
    return await post(householdEndpoints.removeUserFromHousehold(householdId), user);
};

export const updateHousehold = async (household, householdId) => {
    return await patch(householdEndpoints.updateHousehold(householdId), household);
};

export const deleteHousehold = async (householdId) => {
    return await del(householdEndpoints.deleteHousehold(householdId));
};
