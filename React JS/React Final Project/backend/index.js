require('dotenv').config();
const exrpress = require('express');
const database = require('./src/config/database');

const app = exrpress();

app.use(exrpress.urlencoded({ extended: true }));
app.use(exrpress.json({ extended: true }));

const PORT = process.env.PORT || 5000;

database();
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
