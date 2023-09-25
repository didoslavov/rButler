const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUserHouseholds = async (userId) => {
    try {
        const res = await fetch(BASE_URL + '/households/user-households/' + userId);

        if (!res.ok) {
            throw new Error('Failed to fetch households');
        }

        const data = res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};
