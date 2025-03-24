const { camelCase, isEmpty } = require('lodash');

const camelCaseKeys = (obj) => {
    if (isEmpty(obj)) {
        return {};
    }

    return Object.entries(obj).reduce((acc, [key, val]) => {
        acc[camelCase(key)] = val;
        return acc;
    }, {});
};

module.exports = { camelCaseKeys };
