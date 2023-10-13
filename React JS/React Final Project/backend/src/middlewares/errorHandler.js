module.exports = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ResError') {
        const errors = typeof err.message === 'string' ? [err.message] : err.message;
        return res.status(err.code).json({ errors });
    }

    res.status(500).json({ message: 'Internal Server Error' });
};
