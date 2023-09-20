require('dotenv').config();
const exrpress = require('express');
const mongoose = require('mongoose');

const app = exrpress();

app.use(exrpress.urlencoded({ extended: true }));
app.use(exrpress.json({ extended: true }));

const CONNECTION_PORT = process.env.DB_URI;
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECTION_PORT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected successfully...');
        app.listen(PORT, () => {
            console.log(`Server Running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
