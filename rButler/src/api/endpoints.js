export const householdEndpoints = {
    getAllHouseholds: (query) => `/households?search=${query}`,
    getUserHouseholds: (userId) => `/households/${userId}/user-households`,
    createHousehold: '/households/create',
    getUserHouseholdById: '/households/',
    addUserToHousehold: (householdId) => `/households/${householdId}/add-member`,
    removeUserFromHousehold: (householdId) => `/households/${householdId}/remove-member`,
    updateHousehold: (householdId) => `/households/${householdId}/update`,
    deleteHousehold: (householdId) => `/households/${householdId}/delete`,
};

export const listsEndpoints = {
    getListById: '/lists/',
    createList: '/lists/create',
    removeList: (listId) => `/lists/${listId}/delete`,
    addListItem: (listId) => `/lists/${listId}/add-item`,
    removeListItem: (listId) => `/lists/${listId}/delete-item/`,
};

export const userEndpoints = {
    login: '/users/login',
    register: '/users/register',
    update: (userId) => `/users/${userId}/update`,
    passwordReset: (userId) => `/users/${userId}/password-reset`,
    logout: '/users/logout',
};
