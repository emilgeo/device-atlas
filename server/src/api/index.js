const express = require('express');
const devicesApi = require('./devices');

const router = express.Router();

router.use('/', devicesApi);

module.exports = router;
