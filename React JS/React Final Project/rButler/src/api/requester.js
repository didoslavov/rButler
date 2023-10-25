import { clearUserData, getUserData } from '../utils/userData.js';

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        options.headers['Auth'] = user.token;
    }

    try {
        const response = await fetch(BASE_URL + url, options);
        if (!response.ok) {
            if (response.status === 403) {
                clearUserData();
            }

            const error = await response.json();

            return error;
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');
