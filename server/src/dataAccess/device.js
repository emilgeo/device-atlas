const { camelCaseKeys } = require('../helpers/camelCaseKeys');

module.exports = () => {
    async function create(client, deviceData) {
        const result = await client.query(
            `INSERT INTO device (
                vendor, 
                model, 
                primary_hardware_type, 
                os_id, 
                browser_id
            ) 
            VALUES (
                $1, 
                $2, 
                $3, 
                $4, 
                $5
            ) 
            RETURNING *`,
            [
                deviceData.vendor,
                deviceData.model,
                deviceData.primaryHardwareType,
                deviceData.osId,
                deviceData.browserId,
            ]
        );

        return camelCaseKeys(result.rows[0]);
    }

    async function findAll(client) {
        const result = await client.query(
            `SELECT
                device_id,
                vendor,
                model,
                primary_hardware_type,
                os.name AS "osName",
                ARRAY_TO_STRING(os.version_parts, '.') AS "osVersion",
                browser.name AS "browserName",
                browser.rendering_engine AS "browserRenderingEngine"
            FROM
                device
            LEFT JOIN 
                os
            ON
                device.os_id = os.os_id
            LEFT JOIN 
                browser
            ON 
                device.browser_id = browser.browser_id
            WHERE
                primary_hardware_type = 'Tablet'
            ORDER BY os.version_parts
            `
        );

        return result.rows.map(camelCaseKeys);
    }

    return {
        create,
        findAll,
    };
};
