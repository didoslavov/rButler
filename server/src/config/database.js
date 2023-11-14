const mongoose = require('mongoose');

const CONNECTION_PORT = process.env.DB_URI;

module.exports = async () => {
    try {
        await mongoose.connect(CONNECTION_PORT);

        console.log('Database connected successfully...');
    } catch (err) {
        console.error('Error initializing databse');
        console.error(err.message);
        process.exit(1);
    }
};
