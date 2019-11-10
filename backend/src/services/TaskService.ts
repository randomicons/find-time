import * as taskModel from "../model/task.model"
import {docClient} from "../constants";
import {Task} from "../types";

export async function addTask(task: Task, userEmail: string): Promise<{ err?: string }> {
    try {
        await docClient.put(taskModel.createTask(userEmail, task)).promise();
    } catch (err) {
        return {err}
    }
    return {}
}

export async function deleteTask(task: Task, userEmail: string): Promise<{ err?: string }> {
    try {
        const response = await docClient.delete(taskModel.getTask(userEmail, task.name)).promise()
        console.log(response)
    } catch (err) {
        return {err}
    }
    return {}
}

export async function getTasks(userEmail: string): Promise<{ err?: string, data?: Task[] }> {
    try {
        let tempData = await docClient.query(taskModel.getAllTasks(userEmail)).promise()
        // TODO is this even an error if there are no tasks?
        if (!tempData.Items) {
            return {err: "No tasks found"}
        }
        const data: Task[] = []
        tempData.Items!.forEach((val) => {
            delete val.userEmail
            data.push({name: val.type.split("_").slice(1).join("_"), deadline: val.deadline, duration: val.duration})
        })
        console.log(data)
        return {data}
    } catch (err) {
        return {err}
    }
}