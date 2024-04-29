const request = require('supertest');
const app = require('../../app'); 
const User = require('../../models/userModel');
const Route = require('../../models/routeModel');
const Ascent = require('../../models/ascentModel');
const mongoose = require('mongoose');

describe('Ascent Routes', () => {
    // Clear the database before each test
    // beforeEach(async () => {
    //     await mongoose.connection.db.dropDatabase();
    // });

    let token = null
    beforeAll(async () => {
        
        // Create a user
        const testUser = new User({
            username: 'Test User',
            password: '',
        })
        await testUser.save();

        // Get a token for the user
        token = testUser.generateAuthToken();
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    test('Should create a new ascent with a new route', async () => {
        // Creat a new ascent
        const ascent = {
            route: {
                name: 'Test Route',
                grade: 17,
                colour: 'red',
            },
            date: '2021-01-01',
            tickType: 'flash',
            notes: 'Test notes',
        }

        // Send a POST request to the server from the user
        const response = await request(app)
            .post('/api/ascents')
            .set('Authorization', `Bearer ${token}`)
            .send(ascent)
            .expect(201);

    });

    test.skip('Should create a new ascent with an existing route', async () => {
        //
    })

    test.skip('Should not create a new ascent as the ascent schema is not valid', async () => {
        //
    })

    test.skip('Should get all ascents for that user', async () => {
        //
    })

    test.skip('Should get an ascent by id', async () => {
        //
    })

    test.skip('Should update an ascent', async () => {
        //
    })

    test.skip('Should not update an ascent as the ascent schema is not valid', async () => {
        //
    })

    test.skip('Should not update an ascent as the user does not have permission', async () => {
        //
    })

    test.skip('Should not update an ascent as the ascent does not exist', async () => {
        //
    })

    test.skip('Should delete an ascent', async () => {
        //
    })

    test.skip('Should not delete an ascent as the user does not have permission', async () => {
        //
    })

    test.skip('Should not delete an ascent as the ascent does not exist', async () => {
        //
    })
});