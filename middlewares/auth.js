const jwt = require("../helpers/jwt");
const { User, Job, Customer } = require("../models");

async function authentication(req, res, next) {
    const access_token = req.headers.access_token;


    if (access_token) {//jika ada access token

        try {
            let user = jwt.decoded(access_token);

            let userDb = await User.findByPk(+user.id);

            if (+userDb.id === +user.id) {//jika token benar

                req.user = {
                    id: +userDb.id
                };

                next();
            } else {//token salah                
                next({ "code": 401, "message": "Not Authorized" })
            }
        } catch (err) {
            next({ "code": 401, "message": "Invalid JWT" })

        }
    } else {//jika tidak ada access token

        next({ "code": 401, "message": "Please login first" })

    }
}

async function authorization(req, res, next) {
    const { id, role } = req.user;
    const idJob = req.params.id;

    if (role === "admin") {
        next();
    } else {//staff
        let job = await Job.findByPk(+idJob);

        if (job) {
            if (job.AuthorId === +id) {
                next();
            } else {
                next({ "code": 403, "message": "Forbidden" })

            }

        } else {
            next({ "code": 404, "message": "Not found" })

        }
    }
}


async function authorizationForAdminOnly(req, res, next) {
    const { role } = req.user;
    // const idJob = req.params.id;
    if (role === "admin") {
        next();
    } else {//staff        
        next({ "code": 403, "message": "Forbidden" })
    }
}


async function authenticationCustomer(req, res, next) {
    const access_token = req.headers.access_token;

    if (access_token) {//jika ada access token

        try {
            let customer = jwt.decoded(access_token);

            let customerDb = await Customer.findByPk(+customer.id);

            if (+customerDb.id === +customer.id) {//jika token benar

                req.customer = {
                    id: +customerDb.id,
                    email: customer.email,
                    role: customer.role
                };

                next();
            } else {//token salah                
                next({ "code": 401, "message": "Not Authorized" })
            }
        } catch (err) {
            next({ "code": 401, "message": "Invalid JWT" })

        }
    } else {//jika tidak ada access token

        next({ "code": 401, "message": "Please login first" })

    }
}

async function authorizationCustomer(req, res, next) {
    const { id, role, email } = req.customer;


    if (role === "customer") {
        next();
    } else {//staff
        next({ "code": 403, "message": "Forbidden" })
    }
}

module.exports = {
    authentication,
    authorization,
    authorizationForAdminOnly,
    authenticationCustomer,
    authorizationCustomer
};