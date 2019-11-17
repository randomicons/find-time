// export function taskSchema(options?: SchemaOptions) {
//     //TODO add length limits through validate for all of the fields
//     return new Schema({
//         userId: {
//             type: String,
//             hashKey: true,
//         },
//         taskId: {
//             type: String,
//             rangeKey: true
//         },
//         duration: {
//             type: String,
//             required: true,
//         },
//         deadline: {
//             type: String,
//             required: false
//         }
//     }, options)
// }

import {dbTypes} from "../constants";
import {Task} from "../types";

export function createTask(userEmail: string, taskDetails: Task) {
    return {
        TableName: process.env.DB_TABLE!,
        Item: {
            userEmail, duration: taskDetails.duration, deadline: taskDetails.deadline, name: taskDetails.name,
            type: dbTypes.task + "_" + taskDetails.id
        },
        ConditionExpression: "attribute_not_exists(taskName)"
    }
}

export function getTask(userEmail: string, taskId: string) {
    return {
        TableName: process.env.DB_TABLE!,
        Key: {
            userEmail,
            type: dbTypes.task + "_" + taskId
        }
    }
}

export function updateTask(userEmail: string, taskInput: Task) {
    return {
        TableName: process.env.DB_TABLE!,
        Key: {
            userEmail,
            type: dbTypes.task + "_" + taskInput.id
        },
        UpdateExpression: "set "
    }
}

export function getAllTasks(userEmail: string) {
    return {
        //TODO use projection expression?
        TableName: process.env.DB_TABLE!,
        KeyConditionExpression: "#email = :email and begins_with(#type, :type)",
        ExpressionAttributeNames: {
            "#email": "userEmail",
            "#type": "type"
        },
        ExpressionAttributeValues: {
            ":email": userEmail,
            ":type": dbTypes.task
        }
    }
}