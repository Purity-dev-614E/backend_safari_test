// db.js
const pgp = require('pg-promise')();

const db = pgp({
  user: 'postgres',
  host: 'localhost',
  database: 'safariDB',
  password: 'chelagat',
  port: 5432,
});

// Test connection
db.any('SELECT NOW()')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

module.exports = db;

