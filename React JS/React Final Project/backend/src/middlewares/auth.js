const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);

            req.user = data;
        } catch (err) {
            res.clearCookie(token);

            return res.json({ message: 'Invalid token!' });
        }
    }

    next();
};
