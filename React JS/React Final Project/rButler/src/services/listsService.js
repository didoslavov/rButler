const BASE_URL = import.meta.env.VITE_BASE_URL + '/lists';

export const getListById = async (id) => {
    try {
        const res = await fetch(BASE_URL + '/' + id);

        if (!res.ok) {
            const error = await res.json();

            throw new Error(error);
        }
        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

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

export const removeList = async (id, token) => {
    try {
        const res = await fetch(BASE_URL + '/' + id + '/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Auth: token,
            },
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

export const addListItem = async (id, listItem) => {
    const token = listItem.token;
    delete listItem.token;

    try {
        const res = await fetch(BASE_URL + '/' + id + '/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Auth: token,
            },
            body: JSON.stringify(listItem),
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

export const removeListItem = async (itemId, listId, token) => {
    try {
        const res = await fetch(BASE_URL + '/' + listId + '/delete-item/' + itemId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Auth: token,
            },
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
