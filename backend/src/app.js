const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', routes);

app.set('port', process.env.PORT || 3500);

module.exports = app;
