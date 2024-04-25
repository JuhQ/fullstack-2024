require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

console.log('process.argv', process.argv);
console.log('username', MONGODB_USERNAME);
console.log('password', MONGODB_PASSWORD);

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.a0yvhp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

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
