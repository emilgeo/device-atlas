const { camelCaseKeys } = require('../helpers/camelCaseKeys');

module.exports = () => {
    async function findOne(client, os) {
        const { name, version } = os;

        const { rows } = await client.query(
            `SELECT * FROM os WHERE name = $1 AND version_parts = string_to_array($2, '.')::int[]`,
            [name, version]
        );

        return camelCaseKeys(rows[0]);
    }

    async function create(client, os) {
        const { name, version } = os;

        const result = await client.query(
            `INSERT INTO os (name, version_parts) VALUES ($1, string_to_array($2, '.')::int[]) RETURNING *`,
            [name, version]
        );

        return camelCaseKeys(result.rows[0]);
    }

    return {
        create,
        findOne,
    };
};
