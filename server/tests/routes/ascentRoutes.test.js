const request = require('supertest');
const app = require('../../app'); 
const User = require('../../models/userModel');
const Route = require('../../models/routeModel');
const Ascent = require('../../models/ascentModel');
const mongoose = require('mongoose');
const { 
    createTestUser, 
    createTestAscentWithoutRoute,
    createTestAscentWithRoute,
    createTestRoute,
    createTestUserWithAscents
} = require('./utils/testHelpers');

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

        const [testUser, token] = await createTestUser();

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

    });

    test('Should create a new ascent with an existing route', async () => {

        const [testUser, token] = await createTestUser();

        // Create a route and save it to the database
        const route = await createTestRoute(testUser);
        
        // Create a new ascent with this existing route
        const ascent = {
            route: route,
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
        expect(response.body.route._id).toBe(route._id.toString());

    })

    test('Should not create a new ascent as the ascent schema is not valid', async () => {
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

    test('Should get all ascents for that user', async () => {
        
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Create two other users with routes and ascents to ensure that the response only contains the ascents for the user
        await createTestUserWithAscents();
        await createTestUserWithAscents();

        // Send a GET request to the server from the user
        const response = await request(app)
            .get('/api/ascents')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Check that the response contains the correct ascents
        expect(response.body.length).toBe(ascents.length);
        
    })

    test('Should get an ascent by id', async () => {
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Create two other users with routes and ascents to ensure that the response only contains the ascents for the user
        await createTestUserWithAscents();
        await createTestUserWithAscents();

        // Select a random ascent
        const ascent = ascents[Math.floor(Math.random() * ascents.length)];

        // Send a GET request to the server from the user
        const response = await request(app)
            .get(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Check that the response contains the correct ascent
        expect(response.body._id).toBe(ascent._id.toString());
    })

    test('Should not get an ascent by id as the user does not have permission', async () => {
        // Create two users with routes and ascents
        const [user1, token1, routes1, ascents1] = await createTestUserWithAscents();
        const [user2, token2, routes2, ascents2] = await createTestUserWithAscents();

        // Select a random ascent from user1
        const ascent = ascents1[Math.floor(Math.random() * ascents1.length)];

        // Send a GET request to the server from user2
        const response = await request(app)
            .get(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token2}`)
            .expect(403);
    })

    test('Should update an ascent', async () => {
        // Create a user with routes and ascents
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Select a random ascent
        const ascent = ascents[Math.floor(Math.random() * ascents.length)];

        // Create a new route
        const newRoute = await createTestRoute(user);

        // Update the ascent with the new route
        const updatedAscent = {
            route: newRoute,
            date: '2021-01-01',
            tickType: 'flash',
            notes: 'Test notes',
        }

        // Send a PUT request to the server from the user
        const response = await request(app)
            .put(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedAscent)
            .expect(200);

        // Check that the response contains the correct ascent
        expect(response.body.route._id).toBe(newRoute._id.toString());

    })

    test('Should not update an ascent as the ascent schema is not valid', async () => {
        // Create a user with routes and ascents
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Select a random ascent
        const ascent = ascents[Math.floor(Math.random() * ascents.length)];

        // Create a new route
        const newRoute = await createTestRoute(user);

        // Update the ascent with the new route with an invalid tickType
        const updatedAscent = {
            route: newRoute,
            date: '2021-01-01',
            tickType: 'onsight',
        }

        // Send a PUT request to the server from the user
        const response = await request(app)
            .put(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedAscent)
            .expect(400);
    })

    test('Should not update an ascent as the user does not have permission', async () => {
        // Create two users with routes and ascents
        const [user1, token1, routes1, ascents1] = await createTestUserWithAscents();
        const [user2, token2, routes2, ascents2] = await createTestUserWithAscents();

        // Select a random ascent from user1
        const ascent = ascents1[Math.floor(Math.random() * ascents1.length)]

        // Create a new route
        const newRoute = await createTestRoute(user1);

        // Update the ascent with the new route
        const updatedAscent = {
            route: newRoute,
            date: '2021-01-01',
            tickType: 'flash',
            notes: 'Test notes',
        }

        // Send a PUT request to the server from user2
        const response = await request(app)
            .put(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token2}`)
            .send(updatedAscent)
            .expect(403);
        
    })

    test('Should not update an ascent as the ascent does not exist', async () => {
        // Create a user with routes and ascents
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Create a new route
        const newRoute = await createTestRoute(user);

        // Update the ascent with the new route
        const updatedAscent = {
            route: newRoute,
            date: '2021-01-01',
            tickType: 'flash',
            notes: 'Test notes',
        }


        // Send a PUT request to the server from the user
        // NOTE mongoose.Types.ObjectId() generates an id that does not exist in the database
        const response = await request(app)
            .put(`/api/ascents/${new mongoose.Types.ObjectId()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedAscent)
            .expect(404);
    })

    test('Should delete an ascent', async () => {
        // Create a user with routes and ascentsq
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Select a random ascent
        const ascent = ascents[Math.floor(Math.random() * ascents.length)];

        // Send a DELETE request to the server from the user
        const response = await request(app)
            .delete(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);


    })

    test('Should not delete an ascent as the user does not have permission', async () => {
        // Create two users with routes and ascents
        const [user1, token1, routes1, ascents1] = await createTestUserWithAscents();
        const [user2, token2, routes2, ascents2] = await createTestUserWithAscents();

        // Select a random ascent from user1
        const ascent = ascents1[Math.floor(Math.random() * ascents1.length)]

        // Send a DELETE request to the server from user2
        const response = await request(app)
            .delete(`/api/ascents/${ascent._id}`)
            .set('Authorization', `Bearer ${token2}`)
            .expect(403);
    })

    test('Should not delete an ascent as the ascent does not exist', async () => {
        // Create a user with routes and ascents
        const [user, token, routes, ascents] = await createTestUserWithAscents();

        // Send a DELETE request to the server from the user
        // NOTE mongoose.Types.ObjectId() generates an id that does not exist in the database
        const response = await request(app)
            .delete(`/api/ascents/${new mongoose.Types.ObjectId()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    })
});