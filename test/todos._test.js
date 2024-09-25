const request = require("supertest");
const app = require("../app");
const { User, Todo, sequelize  } = require("../models");

let token;

beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables

    // Create dummy data
    await Todo.bulkCreate([
        { title: 'Test Todo 1', status: 'pending', userId: 1 },
        { title: 'Test Todo 2', status: 'completed', userId: 2 },
        //{ title: 'Test Todo 3', status: 'pending', userId: 3 }
    ]);

    const user = await User.create({ username: 'nanda2', email: 'nanda2@gmail.com', password: 'okelah'});
    token = user.generateToken();
});

afterAll(async () => {
    // Destroy all data
    //await Todo.destroy({ where: {}, truncate: true });
    //await sequelize.close();
});

describe('GET TODO [SUCCES CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to GET", async () => {
            
        const response = await request(app)
            .get("/todos")
            .set("Content-Type", "application/json")
            .auth(token, { type: "bearer" })
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('id', 1);
        expect(response.body[0]).toHaveProperty('title', 'Test Todo 1');
        expect(response.body[0]).toHaveProperty('status', 'pending');
        expect(response.body[1]).toHaveProperty('id', 2);
        expect(response.body[1]).toHaveProperty('title', 'Test Todo 2');
        expect(response.body[1]).toHaveProperty('status', 'completed');
    });
})

describe('GET TODO [ERROR CASE]', (done) => {
    // Kerjakan test disini
    it("Should not be able to GET TODO", async () => {
        const response = await request(app)
            .get("/todos")
            .set("Content-Type", "application/json")
            .send();

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Token not found");
    });
})