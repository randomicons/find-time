/**
 * Services get output from database and if needed do any processing on before returning it to the frontend
 */
import * as eventModel from "../model/event.model"
import {docClient} from "../constants";
import {Event} from "../types";

export async function addEvent(event: Event, userEmail: string): Promise<{ err?: string }> {
    try {
        await docClient.put(eventModel.createEvent(userEmail, event)).promise();
    } catch (err) {
        return {err}
    }
    return {}
}

export async function deleteEvent(event: Event, userEmail: string): Promise<{ err?: string }> {
    try {
        await docClient.delete(eventModel.getEvent(userEmail, event.id)).promise()
    } catch (err) {
        return {err}
    }
    return {}
}


export async function updateEvent(event: Event, userEmail: string): Promise<{ err?: string }> {
    try {
        await docClient.update(eventModel.updateEvent(userEmail, event)).promise()
    } catch (err) {
        return {err}
    }
    return {}
}

export async function getEvents(userEmail: string): Promise<{ err?: string, data?: Event[] }> {
    try {
        let tempData = await docClient.query(eventModel.getAllEvents(userEmail)).promise()
        if (!tempData.Items) {
            return {data: []}
        }
        const data: Event[] = []
        tempData.Items.forEach((val) => {
            delete val.userEmail
            data.push({
                id: val.type.split("_").slice(1).join("_"),
                name: val.name,
                startTime: val.startTime,
                duration: val.duration
            })
        })
        console.log(data)
        return {data}
    } catch (err) {
        return {err}
    }
}