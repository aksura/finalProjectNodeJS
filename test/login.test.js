const request = require("supertest");
const app = require("../app");
const { User, sequelize  } = require("../models");

beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables

    // Create dummy data
    await User.create({ username: 'nanda1', email: 'nanda1@gmail.com', password: 'okelah'});
});

afterAll(async () => {
    
});

describe('Login [SUCCES CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to login", async () => {
        const response = await request(app)
            .post("/login")
            .set("Content-Type", "application/json")
            .send({ email: "nanda1@gmail.com", password: "okelah" });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });
})

describe('Login [ERROR CASE]', (done) => {
    // Kerjakan test disini
    it("Should not be able to login when email is invalid", async () => {
        const response = await request(app)
            .post("/login")
            .set("Content-Type", "application/json")
            .send({ email: "test-invalid@mail.com", password: "rahasia" });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Invalid email or password");
    });

    it("Should not be able to login when password is invalid", async () => {
        const response = await request(app)
            .post("/login")
            .set("Content-Type", "application/json")
            .send({ email: "test@mail.com", password: "rahasiaaaa" });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Invalid email or password");
    });
})

