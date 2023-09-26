const jwt = require('jsonwebtoken');

//! Don't forget to implement cookies in some point!

module.exports = () => (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.headers.auth;

    if (token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);

            req.user = data;
        } catch (err) {
            // res.clearCookie(token);

            return res.json({ message: 'Invalid token!' });
        }
    }
    next();
};
