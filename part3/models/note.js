const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

logger.info('config', config);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 3,
    required: true,
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line
    delete returnedObject._id;
    // eslint-disable-next-line
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
