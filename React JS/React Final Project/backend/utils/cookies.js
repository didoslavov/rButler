const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        roles: user.roles,
    };

    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secret);
        return data;
    } catch (error) {
        return null;
    }
};

module.exports = {
    createToken,
    verifyToken,
};
