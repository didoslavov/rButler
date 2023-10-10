import { post } from '../api/requester.js';
import { clearUserData, setUserData } from '../utils/userData.js';

export async function login(credentials) {
    const userData = await post('/users/login', credentials);

    if (userData.success) {
        setUserData(userData.userData);
    }

    return userData;
}

export const userRegister = async (credentials) => {
    const userData = await post('/users/register', credentials);

    if (userData.success) {
        setUserData(userData.userData);
    }

    return userData;
};

export const logout = async () => {
    const userData = await post('/users/logout');

    if (userData.success) {
        clearUserData();
    }
};
