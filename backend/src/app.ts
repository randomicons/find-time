import {json, urlencoded} from "body-parser"
import {port} from "./config"
import constants = require('./constants/index');

require('dotenv').config()
const userRoutes = require('./routes/user.routes')
const app = require('express')()
app.use(json())
app.use(urlencoded({extended: false}))
app.use('/users', userRoutes)
constants.init()
app.listen(port, () => {
    console.log('server is up and running on port number: ' + port)
})
