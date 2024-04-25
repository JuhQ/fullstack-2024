require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.a0yvhp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

module.exports = {
  MONGODB_URI,
  PORT,
};
