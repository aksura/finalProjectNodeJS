require('dotenv').config()
const jwt = require('jsonwebtoken');

function signIn(id, email, role){
    const token = jwt.sign({ "email": email, "id": id, "role": role}, 'secret');    
    return token;
}

function decoded(token){
    const result = jwt.verify(token, 'secret');

    return result;
}

module.exports = {
    signIn,
    decoded
};