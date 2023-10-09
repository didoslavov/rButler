import { get, post } from '../api/requester.js';

export const getAllHouseholds = async (query = '') => {
    return await get(`/households?search=${query}`);
};

export const getUserHouseholds = async (userId) => {
    return await get('/households/user-households/' + userId);
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
    //TODO: Implement Redis DB. You can get deleted household in the request and store it in Redis DB for if user decides to undo deletion
    try {
        const res = await fetch(BASE_URL + '/delete/' + householdId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            },
        });

        if (!res.ok) {
            if (res.status == 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                return res.statusText;
            }

            const error = res.json();

            throw new Error(error);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateHousehold = async (household, householdId, token) => {
    try {
        const res = await fetch(BASE_URL + '/update/' + householdId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            },
            body: JSON.stringify(household),
        });

        if (!res.ok) {
            if (res.status == 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                return res.statusText;
            }

            const error = await res.json();

            throw new Error(error);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};
