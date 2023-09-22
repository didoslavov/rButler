require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3000;

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ extended: true }));

    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
};
