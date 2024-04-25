const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger');
const config = require('./utils/config');
const notesRouter = require('./controllers/notes');
const { requestLogger, unknownEndpoint, handleErrors } = require('./middlewares/middleware');

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestLogger);

app.use('/api/notes', notesRouter);

app.use(unknownEndpoint); // 404
app.use(handleErrors); // kaikki errorit

app.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}.`);
});
