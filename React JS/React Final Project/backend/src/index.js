const express = require('express');
const connectServer = require('./config/express');
const connectDB = require('./config/database');
const routesConfig = require('./config/routes');

const app = express();

connectDB();
connectServer(app);
routesConfig(app);
