// db.js
const pgp = require('pg-promise')();

const db = pgp({
connectionString: 'postgresql://postgres.twfzhtlkxeicfesrrusi:8YMp77XdW!2B4PD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
ssl: { rejectUnauthorized: false }
});

db.connect();

// Test connection
db.any('SELECT NOW()')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

module.exports = db;

