export const getToken = (cookie) => {
    return cookie
        .split('; ')
        .map((c) => c.split('=').pop())
        .join('');
};
