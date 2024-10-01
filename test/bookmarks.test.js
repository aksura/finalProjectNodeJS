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
    },
    {
        title: 'The Dark Knight',
        synopsis: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
        trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
        imgUrl: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        rating: 9,
        status: 'Released'
    },
    {
        title: 'Avatar',
        synopsis: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        trailerUrl: 'https://www.youtube.com/watch?v=5PSNL1qE6VY',
        imgUrl: 'https://image.tmdb.org/t/p/original/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg',
        rating: 7,
        status: 'Released'
    },
    {
        title: 'Titanic',
        synopsis: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
        trailerUrl: 'https://www.youtube.com/watch?v=kVrqfYjkTdQ',
        imgUrl: 'https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
        rating: 8,
        status: 'Released'
    },
    {
        title: 'The Shawshank Redemption',
        synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        trailerUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
        imgUrl: 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        rating: 9,
        status: 'Released'
    },
    {
        title: 'Pulp Fiction',
        synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        trailerUrl: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
        imgUrl: 'https://image.tmdb.org/t/p/original/dM2w364MScsjFf8pfMbaWUcWrR.jpg',
        rating: 8,
        status: 'Released'
    },
    {
        title: 'The Godfather',
        synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        trailerUrl: 'https://www.youtube.com/watch?v=sY1S34973zA',
        imgUrl: 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        rating: 9,
        status: 'Released'
    },
    {
        title: 'Fight Club',
        synopsis: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
        trailerUrl: 'https://www.youtube.com/watch?v=SUXWAEX2jlg',
        imgUrl: 'https://image.tmdb.org/t/p/original/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
        rating: 8,
        status: 'Released'
    }
];


beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    // Create dummy data
    const user = await User.create({ name: 'nanda', username: 'nanda01', email: 'nanda01@gmail.com', password: 'okelah', role: 'user', phoneNumber: '081123456789', address: 'Jakarta Selatan' });
    token = user.generateToken();

    await Movie.bulkCreate(sampleMovies);
    console.log('Sample movies have been added successfully.');

    await Bookmark.bulkCreate(sampleBookmarks);
    console.log('Sample bookmarks have been added successfully.');

});

describe('GET Movies [SUCCES CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to GET MOVIES", async () => {

        const response = await request(app)
            .get("/movies")
            .set("Content-Type", "application/json")
            .auth(token, { type: "bearer" })
            .send();

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe('GET Movies [ERROR CASE]', (done) => {
    // Kerjakan test disini
    it("Should not be able to GET Movies", async () => {
        const response = await request(app)
            .get("/movies")
            .set("Content-Type", "application/json")
            .send();

        console.log(response.body);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Token not found");
    });
})

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

        console.log(response.body);
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

        console.log(response.body);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Token not found");
    });
})