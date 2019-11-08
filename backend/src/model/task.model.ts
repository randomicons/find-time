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

export function createTask(userEmail: string, taskName: string, duration: number, deadline?: number) {
    return {
        Table: process.env.DB_TABLE!,
        Item: {
            userEmail, duration, deadline,
            type: dbTypes.task + "_" + taskName
        },
        ConditionExpression: "attribute_not_exists(taskName)"
    }
}

export function getTask(userEmail: string, taskName: string) {
    return {
        Table: process.env.DB_TABLE!,
        Key: {
            userEmail,
            type: dbTypes.task + "_" + taskName
        }
    }
}