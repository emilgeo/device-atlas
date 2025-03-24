const Pool = require('pg').Pool;

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } =
    process.env;

const pool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: 5432,
    database: POSTGRES_DB,
});

module.exports = pool;
