const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
}
const sql = postgres(connectionString);

module.exports = sql;