const axios = require('axios');


const instance = axios.create({
    baseURL: 'https://upload.imagekit.io/',
});


module.exports = instance;