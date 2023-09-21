require('dotenv').config();
const exrpress = require('express');
const connectDB = require('./src/config/database');

const app = exrpress();

app.use(exrpress.urlencoded({ extended: true }));
app.use(exrpress.json({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/users', require('./src/routes/usersRoutes'));

app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
