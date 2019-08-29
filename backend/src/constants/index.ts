import {userSchema} from "../model/user.model";
import {taskSchema} from "../model/task.model";
import dynamoose = require("dynamoose");

export const aws_region = 'us-east-1'
export const db_local_port = 8000
export let userModel: dynamoose.ModelConstructor<{}, {}>
export let taskModel: dynamoose.ModelConstructor<{}, {}>

export function init() {
    userModel = dynamoose.model(process.env.USER_TABLE!, userSchema())
    taskModel = dynamoose.model(process.env.TASK_TABLE!, taskSchema())
}
