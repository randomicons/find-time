import {json, urlencoded} from "body-parser"
import {port} from "./config"
import {taskRoutes} from "./routes/task.routes";
import {userRoutes} from "./routes/user.routes";
import cookieParser = require("cookie-parser");
import constants = require('./constants/index');
import logger = require("morgan");

require('dotenv').config()
const app = require('express')()
app.use(logger("dev"))
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
constants.init()
app.listen(port, () => {
    console.log('server is up and running on port number: ' + port)
})
