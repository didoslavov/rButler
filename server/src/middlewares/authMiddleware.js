const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.headers.auth;

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);

        req.user = data;
    } catch (err) {
        // res.clearCookie(token);

        return res.status(403).json({ message: 'Invalid token!' });
    }
    next();
};
