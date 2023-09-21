require('dotenv').config();
const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const DBConnection = process.env.dbConnection;

(async () => {
  // eslint-disable-next-line no-unused-vars
  const db = await mongoose.connect(DBConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // eslint-disable-next-line no-console
  console.log('DB ONLINE');
})();
