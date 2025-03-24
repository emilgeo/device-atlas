const { camelCaseKeys } = require('../helpers/camelCaseKeys');

module.exports = () => {
    async function findOne(client, browser) {
        const { name, renderingEngine } = browser;

        const { rows } = await client.query(
            `SELECT 
                * 
            FROM 
                browser 
            WHERE 
                name = $1 AND 
                rendering_engine = $2`,
            [name, renderingEngine]
        );

        return camelCaseKeys(rows[0]);
    }

    async function create(client, browser) {
        const { name, renderingEngine } = browser;

        const result = await client.query(
            `INSERT INTO 
                browser (
                name, 
                rendering_engine
            ) VALUES (
                $1, 
                $2
            ) 
            RETURNING *`,
            [name, renderingEngine]
        );

        return camelCaseKeys(result.rows[0]);
    }

    return {
        create,
        findOne,
    };
};
