import { patch, post } from '../api/requester.js';
import { userEndpoints } from '../api/endpoints.js';

export async function login(credentials) {
    const res = await post(userEndpoints.login, credentials);

    if (res.userData) {
        return res.userData;
    }

    return res;
}

export const userRegister = async (credentials) => {
    const res = await post(userEndpoints.register, credentials);

    if (res.userData) {
        return res.userData;
    }

    return res;
};

export const editUser = async (userData, userId) => {
    return await patch(userEndpoints.update(userId), userData);
};

export const resetPassword = async (userData, userId) => {
    return await patch(userEndpoints.passwordReset(userId), userData);
};

export const logout = async () => {
    return post(userEndpoints.logout);
};
