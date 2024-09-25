const bcrypt = require('bcryptjs');

function encrypt(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

function comparePass(inputedPass , dbPass) {        
    return bcrypt.compareSync(inputedPass, dbPass);      
}

module.exports = {
    encrypt,
    comparePass
}