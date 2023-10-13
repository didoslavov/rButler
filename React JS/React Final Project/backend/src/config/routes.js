const userRouter = require('../routes/usersRoutes');
const householdRouter = require('../routes/householdsRoutes');
const listsRouter = require('../routes/listsRoutes.js');
const errorHandler = require('../middlewares/errorHandler.js');

module.exports = (app) => {
    app.use('/users', userRouter);
    app.use('/households', householdRouter);
    app.use('/lists', listsRouter);
    app.use(errorHandler);
};
