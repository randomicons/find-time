import aws = require("aws-sdk");
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

export const dbTypes = {userInfo: "userInfo", task: "task", event: "event"}
export let docClient: DocumentClient

export function init() {
    docClient = new aws.DynamoDB.DocumentClient()
}
