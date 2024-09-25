require('dotenv').config()
const express = require('express')
const app = express()
const router = require("./routes");
const cors = require('cors')

app.use(cors());


//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
//test git
module.exports = app;