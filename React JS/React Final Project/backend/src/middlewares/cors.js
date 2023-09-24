module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};
