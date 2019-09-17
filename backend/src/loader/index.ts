import * as constants from "../constants";
import {json, urlencoded} from "body-parser";
import {userRoutes} from "../routes/user.routes";
import {taskRoutes} from "../routes/task.routes";
import express from "express";
import logger = require("morgan");
import dynamoose = require('dynamoose');
import cookieParser = require("cookie-parser");

export default function (app: express.Application) {
    dynamoose.AWS.config.update({
        region: constants.aws_region,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    if (process.env.DEBUG)
        dynamoose.local()
    app.use(logger("dev"))
    app.use(json())
    app.use(urlencoded({extended: false}))
    app.use(cookieParser())
    app.use('/users', userRoutes)
    app.use('/tasks', taskRoutes)
    constants.init()
}