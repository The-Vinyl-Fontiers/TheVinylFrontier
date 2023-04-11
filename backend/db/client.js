const { Client } = require('pg');
require("dotenv").config();

const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/TheVinylFrontiers`;

// const client = new Client({
//   connectionString,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
// });

const client = new Client(process.env.DATABASE_URL)
client.password= process.env.DATABASE_PASSWORD

module.exports = client;