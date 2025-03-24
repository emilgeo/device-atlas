const da = require('../dataAccess');
const deviceDomain = require('../domain/device');

function addDevices() {
    return deviceDomain.addDevices(da);
}

function findDevices() {
    return deviceDomain.findDevices(da);
}

module.exports = { addDevices, findDevices };
