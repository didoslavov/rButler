import { post } from '../api/requester.js';
import { clearUserData } from '../utils/userData.js';
import { authEndpoints } from '../api/endpoints.js';

export async function login(credentials) {
    const res = await post(authEndpoints.login, credentials);

    if (res.userData) {
        return res.userData;
    }

    return res;
}

export const userRegister = async (credentials) => {
    const res = await post(authEndpoints.register, credentials);

    if (res.userData) {
        return res.userData;
    }

    return res;
};

export const logout = async () => {
    const userData = await post(authEndpoints.logout);

    if (userData.success) {
        clearUserData();
    }
};
