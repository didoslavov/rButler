const BASE_URL = import.meta.env.VITE_BASE_URL + '/households';

export const getUserHouseholds = async (userId, token) => {
    try {
        const res = await fetch(BASE_URL + '/user-households/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
                auth: token,
            },
        });

        if (!res.ok) {
            if (res.status == 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
                return res.statusText;
            }

            const error = res.json();

            throw new Error(error);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error.message);
    }
};

export const createHousehold = async (household) => {
    const token = household.token;
    delete household.token;

    try {
        const res = await fetch(BASE_URL + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Auth: token,
            },
            body: JSON.stringify(household),
        });

        if (!res.ok) {
            if (res.status == 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
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

export const getUserHouseholdById = async (id, token) => {
    try {
        const res = await fetch(BASE_URL + '/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            },
        });

        if (!res.ok) {
            if (res.status == 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
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

export const addUserToHousehold = async (username, role, householdId, token) => {
    console.log('hoseholdService>>> ', householdId);
    try {
        const res = await fetch(BASE_URL + '/' + householdId + '/add-member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            },
            body: JSON.stringify({ username, role, householdId, token }),
        });

        if (!res.ok) {
            if (res.status == 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
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
                localStorage.removeItem('userInfo');
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
                localStorage.removeItem('userInfo');
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
