import {port} from "./config"
import init from "./loader"
import express = require('express');

require('dotenv').config()
const app = express()
init(app)
app.listen(port, () => {
    console.log('server is up and running on port number: ' + port)
})
