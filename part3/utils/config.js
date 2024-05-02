require('dotenv').config();

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  TEST_MONGODB_USERNAME,
  TEST_MONGODB_PASSWORD,
  PORT
} = process.env;

// Huom: mikäli tuotanto ja testiympäristöjen mongodb:n urin loppuosa on eri, ei tämänkaltaisessa uudelleenkäytettävässä funktiossa välttämättä ole järkeä.
const createMongoUri = (username, password) =>
  `mongodb+srv://${username}:${password}@cluster0.a0yvhp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const PROD_MONGODB_URI = createMongoUri(MONGODB_USERNAME, MONGODB_PASSWORD)
const TEST_MONGODB_URI = createMongoUri(TEST_MONGODB_USERNAME, TEST_MONGODB_PASSWORD)

const MONGODB_URI = process.env.NODE_ENV === "test" ? TEST_MONGODB_URI : PROD_MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
