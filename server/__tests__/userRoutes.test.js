const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/userModel')

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

describe('User Routes', () => {

    // Delete all users before each test
    beforeEach(async () => {
        await User.deleteMany({});
    });

    // Test for /api/user/register success
    test('should create a new user', async () => {
        const res = await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Account created successfully');
    });

    // Test for /api/user/register failure
    test('should not create a new user', async () => {
        // Successfully create a user
        await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        
        // Then create a user with the same username
        const res = await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Username already taken');
    });
});