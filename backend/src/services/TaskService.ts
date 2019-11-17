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
        const response = await docClient.delete(taskModel.getTask(userEmail, task.id)).promise()
        console.log(response)
    } catch (err) {
        return {err}
    }
    return {}
}

export async function getTasks(userEmail: string): Promise<{ err?: string, data?: Task[] }> {
    try {
        let tempData = await docClient.query(taskModel.getAllTasks(userEmail)).promise()
        if (!tempData.Items) {
            return {data: []}
        }
        const data: Task[] = []
        tempData.Items.forEach((val) => {
            delete val.userEmail
            data.push({
                id: val.type.split("_").slice(1).join("_"),
                name: val.name,
                deadline: val.deadline,
                duration: val.duration
            })
        })
        console.log(data)
        return {data}
    } catch (err) {
        return {err}
    }
}