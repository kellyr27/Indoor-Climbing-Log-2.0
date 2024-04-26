// userRoutes.test.js
const request = require('supertest');
const app = require('../../app'); 
const User = require('../../models/userModel');

describe('User Routes', () => {
    // Clear the database before each test
    beforeEach(async () => {
        await User.deleteMany();
    });

    test('Should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword123'
            })
            .expect(201);

        // Assert that the database was changed correctly
        const user = await User.findOne({ username: 'testuser' });
        expect(user).not.toBeNull();

        // Assertions about the response
        expect(response.body.message).toEqual('Account created successfully');
    });

    test('Should not register a new user with an existing username', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword123'
            });

        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword123'
            })
            .expect(400);

        // Assertions about the response
        expect(response.body.message).toEqual('Username already taken');
    });

    test('Should login existing user', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword123'
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword123'
            })
            .expect(200);

        // Assertions about the response
        expect(response.body).toHaveProperty('token');
    });

    test('Should not login non-existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'nonexistinguser',
                password: 'testpassword123'
            })
            .expect(404);

        // Assertions about the response
        expect(response.body.message).toEqual('User not found');
    });

    test('Should not login user with incorrect password', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword123'
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            })
            .expect(401);

        // Assertions about the response
        expect(response.body.message).toEqual('Invalid password');
    });
});