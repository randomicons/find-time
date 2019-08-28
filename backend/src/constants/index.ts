import {userSchema} from "../model/user.model";
import dynamoose = require("dynamoose");

export const aws_region = 'us-east-1'
export const db_local_port = 8000
export let userModel: dynamoose.ModelConstructor<{}, {}>

export function init() {
    userModel = dynamoose.model('find-time-users', userSchema())
}
