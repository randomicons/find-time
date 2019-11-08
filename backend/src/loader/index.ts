import * as constants from "../constants";
import {json, urlencoded} from "body-parser";
import {userRoutes} from "../routes/user.routes";
import {taskRoutes} from "../routes/task.routes";
import express from "express";
import * as logger from "morgan"
import * as cookieParser from "cookie-parser"

const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
})
if (process.env.DEBUG) {
    AWS.config.update({
        endpoint: "http://localhost:" + process.env.DEBUG_DYNAMO_PORT
    })
}
export default function (app: express.Application) {
    if (process.env.DEBUG) {
        console.log("debug")
    }

    app.use(logger("dev"))
    app.use(json())
    app.use(urlencoded({extended: false}))
    app.use(cookieParser())
    app.use('/users', userRoutes)
    app.use('/tasks', taskRoutes)
    constants.init()
}