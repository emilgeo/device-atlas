const express = require('express');
const application = require('../application/device');

const router = express.Router();

router.post('/devices', async (req, res) => {
    const response = await application.addDevices();

    if (response.isError) {
        res.status(400).json({ message: response.errorMessage });
    }

    res.json({ message: response.message });
});

router.get('/devices', async (req, res) => {
    const result = await application.findDevices();
    res.json(result);
});

module.exports = router;
