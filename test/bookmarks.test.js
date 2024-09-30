const request = require("supertest");
const app = require("../app");
const { User, Bookmark, sequelize } = require("../models");

const { Movie } = require('../models');

const sampleBookmarks = [
    {
        userId: 1,
        movieId: 1
    },
    {
        userId: 1,
        movieId: 3
    }
];

const sampleMovies = [
    {
        title: 'Inception',
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        imgUrl: 'https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
        rating: 8,
        status: 'Released'
    },
    {
        title: 'The Matrix',
        synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        trailerUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
        imgUrl: 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        rating: 9,
        status: 'Released'
    },
    {
        title: 'Interstellar',
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
        imgUrl: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
        rating: 8,
        status: 'Released'
    }
];

beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables

    sequelize.models = {};

    // Create dummy data
    const user = await User.create({ user: 'nanda', username: 'nanda88', email: 'nanda3@gmail.com', password: 'okelah', role : 'user', phoneNumber : '081123456789', address : 'Jakarta Selatan' });
    token = user.generateToken();

    await Movie.bulkCreate(sampleMovies);
    console.log('Sample movies have been added successfully.');

    await Bookmark.bulkCreate(sampleBookmarks);
    console.log('Sample bookmarks have been added successfully.');

});

describe('GET Bookmarks [SUCCES CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to GET", async () => {

        const response = await request(app)
            .get("/bookmarks")
            .set("Content-Type", "application/json")
            .auth(token, { type: "bearer" })
            .send();

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('POST Bookmarks [SUCCES CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to POST", async () => {

        const response = await request(app)
            .post("/bookmark/2")
            .set("Content-Type", "application/json")
            .auth(token, { type: "bearer" })
            .send();

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
})

describe('GET Bookmarks [ERROR CASE]', (done) => {
    // Kerjakan test disini
    it("Should not be able to GET TODO", async () => {
        const response = await request(app)
            .get("/bookmarks")
            .set("Content-Type", "application/json")
            .send();

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Token not found");
    });
})

describe('POST Bookmarks [ERROR CASE]', (done) => {
    // Kerjakan test disini
    it("Should not be able to POST Bookmark", async () => {
        const response = await request(app)
            .post("/bookmark/12")
            .set("Content-Type", "application/json")
            .send();

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Token not found");
    });
})