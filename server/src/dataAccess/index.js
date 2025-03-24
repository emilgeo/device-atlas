const pool = require('../db');
const device = require('./device');
const os = require('./os');
const browser = require('./browser');

async function runTransaction(callback) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Utility to wrap all functions in transactions
function withTransaction(queries) {
    const wrappedQueries = {};
    for (const [key, func] of Object.entries(queries)) {
        wrappedQueries[key] = (args) =>
            runTransaction((client) => func(client, args));
    }
    return wrappedQueries;
}

const dataAccess = {
    device: withTransaction(device()),
    os: withTransaction(os()),
    browser: withTransaction(browser()),
};

module.exports = dataAccess;
