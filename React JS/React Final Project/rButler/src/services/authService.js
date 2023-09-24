const BASE_URL = 'http://localhost:3000';

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
            throw new Error('Login failed!');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error('Login failed!');
    }
};
