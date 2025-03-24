const axios = require('axios');
const { isEmpty } = require('lodash');

const apiUrl =
    'https://region0.deviceatlascloud.com/v1/detect/properties?licencekey=e6ce0b9455cab0e494be4587d016c7c2';

const userAgents = [
    'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/47.1.79 like Chrome/47.0.2526.80 Safari/537.36',
    'Mozilla/5.0 (iPad; CPU OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/112.0.5615.46 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 12; SM-X906C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36',
    'Dalvik/2.1.0 (Linux; U; Android 10; ACTAB1021 Build/QP1A.190711.020)',
    'Mozilla/5.0 (Linux; Android 13; SM-A515U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 5.0.2; LG-V410/V41020c Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/34.0.1847.118 Safari/537.36',
];

async function addDevices(dataAccess) {
    const devicesResult = await dataAccess.device.findAll();
    if (devicesResult.length > 0) {
        return { message: 'Devices already exist' };
    }

    for (const userAgent of userAgents) {
        const url = `${apiUrl}&useragent=${encodeURIComponent(userAgent)}`;

        const { data } = await axios.get(url);

        if (isEmpty(data?.properties)) {
            return { message: 'Device Atlas API response is empty' };
        }

        const {
            primaryHardwareType,
            osVersion,
            vendor,
            browserName,
            model,
            osName,
            browserRenderingEngine,
        } = data.properties;
        const os = {
            name: osName,
            version: osVersion,
        };
        const browser = {
            name: browserName,
            renderingEngine: browserRenderingEngine,
        };

        let osResult = await dataAccess.os.findOne(os);
        if (!osResult.osId) {
            osResult = await dataAccess.os.create(os);
        }
        let browserResult = await dataAccess.browser.findOne(browser);
        if (!browserResult.browserId) {
            browserResult = await dataAccess.browser.create(browser);
        }

        const deviceData = {
            vendor,
            model,
            primaryHardwareType,
            osId: osResult.osId,
            browserId: browserResult.browserId,
        };

        await dataAccess.device.create(deviceData);
    }

    return { message: 'Devices have been added' };
}

async function findDevices(dataAccess) {
    return await dataAccess.device.findAll();
}

module.exports = { addDevices, findDevices };
