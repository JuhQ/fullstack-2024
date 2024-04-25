const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');

if (process.argv.length < 3) {
  logger.info('give password as argument');
  process.exit(1);
}

logger.info('process.argv', process.argv);

/*
const [nodecommand, nodefile, ...arguments] = process.argv
const [password] = arguments
logger.info("arguments", arguments)
*/

const url = config.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  mysql: String,
  important: Boolean,
  date: Date,
  luento: String,
});

const Note = mongoose.model('Note', noteSchema);

/*
const note = new Note({
  content: 'HTML is easy',
  mysql: "vaatii skeeman",
  important: true,
  date: new Date(),
  luento: "kohta ohi"
})

note.save().then(result => {
  logger.info('note saved!')
  logger.info("result", result)
  mongoose.connection.close()
})
*/

Note.find({
  important: true,
  mysql: 'vaatii sen',
}).then((results) => {
  logger.info('results', results);

  results.forEach((result) => {
    // eslint-disable-next-line
    logger.info(`result ${result._id}`, result);
  });

  mongoose.connection.close();
});
