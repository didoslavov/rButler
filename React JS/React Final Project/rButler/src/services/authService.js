import { post } from '../api/requester.js';
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
    return post(authEndpoints.logout);
};
