import {dbTypes} from "../constants";
import {Event} from "../interfaces";

export function createEvent(userEmail: string, eventDetails: Event) {
    return {
        TableName: process.env.DB_TABLE!,
        Item: {
            userEmail, duration: eventDetails.duration, startTime: eventDetails.startTime, name: eventDetails.name,
            type: dbTypes.event + "_" + eventDetails.id
        },
        ConditionExpression: "attribute_not_exists(#type)",
        ExpressionAttributeNames: {
            "#type": "type"
        }
    }
}

export function getEvent(userEmail: string, eventId: string) {
    return {
        TableName: process.env.DB_TABLE!,
        Key: {
            userEmail,
            type: dbTypes.event + "_" + eventId
        }
    }
}

export function updateEvent(userEmail: string, eventInput: Event) {
    return {
        TableName: process.env.DB_TABLE!,
        Key: {
            userEmail,
            type: dbTypes.event + "_" + eventInput.id
        },
        UpdateExpression: "set #name = :name, startTime = :startTime, #duration = :duration",
        ExpressionAttributeNames: {"#name": "name", "#duration": "duration"},
        ExpressionAttributeValues: {
            ":name": eventInput.name,
            ":startTime": eventInput.startTime,
            ":duration": eventInput.duration
        }
    }
}

export function getAllEvents(userEmail: string) {
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
            ":type": dbTypes.event
        }
    }
}