const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const notesRouter = require('./controllers/notes');
const { requestLogger, unknownEndpoint, handleErrors } = require('./middlewares/middleware');
const config = require('./utils/config');
require("express-async-errors")
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI);

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestLogger);

app.use('/api/notes', notesRouter);

app.use(unknownEndpoint); // 404
app.use(handleErrors); // kaikki errorit

module.exports = app;
