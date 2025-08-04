const { Client } = require('pg');
require('dotenv').config(); // Optional if using .env file

const global = new Client({
    host: 'localhost',
    host: '192.168.1.3',
    user: 'postgres',
    port: 5432,
    password: 'Kunal@1234', // ideally from process.env.PG_PASSWORD
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
