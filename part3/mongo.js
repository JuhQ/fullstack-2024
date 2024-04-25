const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

console.log('process.argv', process.argv);

/*
const [nodecommand, nodefile, ...arguments] = process.argv
const [password] = arguments
console.log("arguments", arguments)
*/

const url = `mongodb+srv://juhatauriainen:${password}@cluster0.a0yvhp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
  console.log('note saved!')
  console.log("result", result)
  mongoose.connection.close()
})
*/

Note.find({
  important: true,
  mysql: 'vaatii sen',
}).then((results) => {
  console.log('results', results);

  results.forEach((result) => {
    // eslint-disable-next-line
    console.log(`result ${result._id}`, result);
  });

  mongoose.connection.close();
});
