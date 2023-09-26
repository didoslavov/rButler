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
            throw new Error('Failed to fetch households!');
        }

        const data = res.json();

        return data;
    } catch (error) {
        console.error(error);
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
            throw new Error('Failed to create household!');
        }

        const data = res.json();

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

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};
