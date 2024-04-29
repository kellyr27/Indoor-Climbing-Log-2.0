const request = require('supertest');
const app = require('../../app'); 
const User = require('../../models/userModel');
const Route = require('../../models/routeModel');
const Ascent = require('../../models/ascentModel');
const mongoose = require('mongoose');

describe('Ascent Routes', () => {
    // Clear the database before each test
    beforeEach(async () => {
        // Only delete the Routes and Ascents from the database
        await Route.deleteMany();
        await Ascent.deleteMany();
    });

    let token
    let testUser
    beforeAll(async () => {
        
        // Create a user
        testUser = new User({
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
        // Create a new ascent
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

        // Check that the response contains the correct ascent
        console.log(response.body)

    });

    test.skip('Should create a new ascent with an existing route', async () => {
        // Create a route and save it to the database
        const route = new Route({
            name: 'Test Route',
            grade: 17,
            colour: 'red',
            user: testUser._id,
        })
        await route.save();

        // Create a new ascent with this existing route
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

    })

    test.skip('Should not create a new ascent as the ascent schema is not valid', async () => {
        // Create a new ascent with an invalid schema
        const invalidAscent = {
            route: {
                name: 'Test Route',
                grade: '',
                colour: '',
            },
            date: '2021-01-01',
            tickType: 'flash',
        }

        // Send a POST request to the server from the user
        const response = await request(app)
            .post('/api/ascents')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidAscent)
            .expect(400);

    })

    test.skip('Should get all ascents for that user', async () => {
        // Create a few ascents for testing
        const ascent1 = new Ascent({
            user: testUser._id,
            route: {
                name: 'Test Route 1',
                grade: 17,
                colour: 'red',
            },
            date: '2021-01-01',
            tickType: 'flash',
            notes: 'Test notes 1',
        })
        await ascent1.save();

        const ascent2 = new Ascent({
            user: testUser._id,
            route: {
                name: 'Test Route 2',
                grade: 18,
                colour: 'blue',
            },
            date: '2021-01-02',
            tickType: 'hangdog',
            notes: 'Test notes 2',
        })
        await ascent2.save();

        // Create another user and log an ascent for that user
        const otherUser = new User({
            username: 'Other User',
            password: '',
        })
        await otherUser.save();
        const ascent3 = new Ascent({
            user: otherUser._id,
            route: {
                name: 'Test Route 3',
                grade: 19,
                colour: 'green',
            },
            date: '2021-01-03',
            tickType: 'redpoint',
            notes: 'Test notes 3',
        })
        await ascent3.save();

        // Send a GET request to the server from the user
        const response = await request(app)
            .get('/api/ascents')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Check that the response contains the correct ascents
        expect(response.body.length).toBe(2);
        expect(response.body[0].route.name).toBe('Test Route 1');
        expect(response.body[1].route.name).toBe('Test Route 2');
        
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