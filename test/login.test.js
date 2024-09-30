const request = require("supertest");
const app = require("../app");
const { User, sequelize  } = require("../models");

beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables

    // Create dummy data
    //await User.create({ username: 'nanda1', email: 'nanda1@gmail.com', password: 'okelah'});
    await User.create({ name: 'nanda', username: 'nanda01', email: 'nanda01@gmail.com', password: 'okelah', role : 'user', phoneNumber : '081123456789', address : 'Jakarta Selatan' });
});

afterAll(async () => {
    
});

describe('Register [SUCCESS CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to register", async () => {
        const response = await request(app)
            .post("/register")
            .set("Content-Type", "application/json")
            .send({name: 'johny', username: 'johny01', email: 'johny01@gmail.com', password: 'pemandangan', role : 'user', phoneNumber : '085223456789', address : 'Jakarta Barat' });

        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
})

describe('Register [FAILED CASE]', (done) => {
    // Kerjakan test disini
    it("Should not be able to register", async () => {
        const response = await request(app)
            .post("/register")
            .set("Content-Type", "application/json")
            .send({name: 'johny', username: 'johny01', email: 'johny01@gmail.com', password: 'pemandangan', role : 'user', phoneNumber : '085223456789', address : 'Jakarta Barat' });

        console.log(response.body);
        expect(response.statusCode).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
    });
})

describe('Login [SUCCES CASE]', (done) => {
    // Kerjakan test disini
    it("Should be able to login", async () => {
        const response = await request(app)
            .post("/login")
            .set("Content-Type", "application/json")
            .send({ email: "nanda01@gmail.com", password: "okelah" });

        console.log(response.body);
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
            .send({ email: "test-invalid@mail.com", password: "okelah" });

        console.log(response.body);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Invalid email or password");
    });

    it("Should not be able to login when password is invalid", async () => {
        const response = await request(app)
            .post("/login")
            .set("Content-Type", "application/json")
            .send({ email: "nanda01@gmail.com", password: "rahasiaaaa" });

        console.log(response.body);
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthenticated");
        expect(response.body.message).toBe("Invalid email or password");
    });
})

