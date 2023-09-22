const userRouter = require('../routes/usersRoutes');
const householdRouter = require('../routes/householdsRoutes');

module.exports = (app) => {
    app.use('/users', userRouter);
    app.use('/households', householdRouter);
};
