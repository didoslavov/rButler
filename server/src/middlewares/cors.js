module.exports = () => (req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'https://reactbutler.netlify.app'];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
};
