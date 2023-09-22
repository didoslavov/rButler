module.exports = (app) => {
    app.use('/users', require('../routes/usersRoutes'));
    app.use('/households', require('../routes/householdsRoutes'));
};
