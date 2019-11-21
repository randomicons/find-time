import * as constants from "../constants";
import {json, urlencoded} from "body-parser";
import {userRoutes} from "../routes/user.routes";
import {taskRoutes} from "../routes/task.routes";
import express from "express";
import * as logger from "morgan"
import * as cookieParser from "cookie-parser"
import createTable from "../model/DBSchema";
import {eventRoutes} from "../routes/event.routes";

const AWS = require("aws-sdk");

export default function (app: express.Application) {
    AWS.config.update({
        region: process.env.AWS_REGION,
    })
    if (process.env.DEBUG) {
        AWS.config.update({
            endpoint: "http://localhost:" + process.env.DEBUG_DYNAMO_PORT
        })
    }
    if (process.env.DEBUG) {
        console.log("RUNNING DEBUG MODE")
    }

    app.use(logger("dev"))
    app.use(json())
    app.use(urlencoded({extended: false}))
    app.use(cookieParser())
    app.use('/users', userRoutes)
    app.use('/tasks', taskRoutes)
    app.use('/events', eventRoutes)
    constants.init()
    createTable()
}