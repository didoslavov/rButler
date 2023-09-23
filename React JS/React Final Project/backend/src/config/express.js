require('dotenv').config();
const express = require('express');
const cors = require('../middlewares/cors.js');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth.js');

const PORT = process.env.PORT || 3000;

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(auth());

    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
};
