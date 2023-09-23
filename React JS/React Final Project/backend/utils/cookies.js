const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        roles: user.roles,
    };

    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
};
