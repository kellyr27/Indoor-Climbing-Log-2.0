const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../../models/userModel');

describe('Authenticate Middleware', () => {
    let token;

    beforeAll(async () => {
        const user = new User({ username: 'testuser', password: 'testpassword' });
        await user.save();

        token = user.generateAuthToken();
    });

    afterAll(async () => {
        await User.deleteMany();
        await mongoose.connection.close();
    });

    it('should pass authentication with valid token', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    it('should fail authentication with invalid token', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalidtoken');

        expect(res.statusCode).toEqual(401);
    });
});