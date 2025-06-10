const { Client } = require('pg');
require('dotenv').config(); // Optional if using .env file

const global = new Client({
    host: '192.168.1.6',
    user: 'govind',
    port: 5432,
    password: 'govind8429', // ideally from process.env.PG_PASSWORD
    database: 'global'
});

async function connectDB() {
    try {
        await global.connect();
        console.log('Postgres Connected successfully');
    } catch (err) {
        console.error('Postgres connection error', err);
    }
}

connectDB();

module.exports = global;
