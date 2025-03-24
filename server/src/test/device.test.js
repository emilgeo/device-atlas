const app = require('../app');
const supertest = require('supertest');

describe('devices API', () => {
    it('POST devices', async () => {
        const response = await supertest(app).post('/api/devices');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Devices already exist');
    });

    it('GET devices', async () => {
        const response = await supertest(app).get('/api/devices');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    deviceId: expect.any(String),
                    vendor: expect.any(String),
                    model: expect.any(String),
                    primaryHardwareType: expect.any(String),
                    osName: expect.any(String),
                    osVersion: expect.any(String),
                    browserName: expect.any(String),
                    browserRenderingEngine: expect.any(String),
                }),
            ])
        );
    });
});
