require('dotenv').config();
const exrpress = require('express');
const connectDB = require('./config/database');

const app = exrpress();

app.use(exrpress.urlencoded({ extended: true }));
app.use(exrpress.json({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/users', require('./routes/usersRoutes'));
app.use('/households', require('./routes/householdsRoutes'));

app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
