import { post } from '../api/requester.js';
import { clearUserData, setUserData } from '../utils/userData.js';
import { authEndpoints } from '../api/endpoints.js';

export async function login(credentials) {
    const userData = await post(authEndpoints.login, credentials);

    if (userData.success) {
        setUserData(userData.userData);
    }

    return userData;
}

export const userRegister = async (credentials) => {
    const userData = await post(authEndpoints.register, credentials);

    if (userData.success) {
        setUserData(userData.userData);
    }

    return userData;
};

export const logout = async () => {
    const userData = await post(authEndpoints.logout);

    if (userData.success) {
        clearUserData();
    }
};
