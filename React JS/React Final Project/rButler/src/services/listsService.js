const BASE_URL = import.meta.env.VITE_BASE_URL + '/lists';

export const createList = async (list) => {
    const token = list.token;
    delete list.token;

    try {
        const res = await fetch(BASE_URL + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Auth: token,
            },
            body: JSON.stringify(list),
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
