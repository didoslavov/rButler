const CONNECTION_PORT = process.env.DB_URI;
const mongoose = require('mongoose');

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_PORT, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Database connected successfully...');
    } catch (err) {
        console.error('Error initializing databse');
        console.error(err.message);
        process.exit(1);
    }
};
