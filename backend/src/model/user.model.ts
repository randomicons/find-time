// export const userSchema = (options?: SchemaOptions) => {
//     return new Schema({
//         userId: {
//             type: String,
//             trim: true,
//             hashKey: true
//         },
//         dateCreated: {
//             type: String,
//             trim: true,
//             required: true
//         },
//         password: {
//             type: String,
//             required: true
//         }
//     }, options)
// }

import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import * as constants from "../constants";
import PutItemInput = DocumentClient.PutItemInput;

export function createUser(email: string, password: string): PutItemInput {
    return {
        TableName: process.env.DB_TABLE!,
        Item: {
            userEmail: email,
            type: constants.dbTypes.userInfo,
            password: password,
            dateCreated: Date.now().valueOf()
        },
        ConditionExpression: "attribute_not_exists(userEmail)",
    }
}

export function getUser(email: string) {
    return {
        TableName: process.env.DB_TABLE!,
        Key: {
            userEmail: email,
            type: constants.dbTypes.userInfo
        }
    }
}
