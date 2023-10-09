const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (credentials) => {
    try {
        const response = await fetch(BASE_URL + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return error;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const userRegister = async (credentials) => {
    try {
        const response = await fetch(BASE_URL + '/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();

            return error;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const logout = async () => {
    const token = localStorage.getItem('userData')?.token;

    if (token) {
        localStorage.removeItem('userData');
    }

    await fetch(BASE_URL + '/users/logout', {
        method: 'POST',
        credentials: 'include',
    });
};
