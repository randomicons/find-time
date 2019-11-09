import * as taskModel from "../model/task.model"
import {docClient} from "../constants";


interface Task {
    name: string,
    userEmail: string,
    duration: number
    deadline?: number
}

export async function addTask(taskInput: Task, userEmail: string): Promise<{ err?: string }> {
    try {
        const val = await docClient.put(taskModel.createTask(userEmail, taskInput.name, taskInput.duration, taskInput.deadline)).promise()
        console.log(val)
    } catch (err) {
        return {err}
    }
    return {}
}

export async function getTasks(userEmail: string): Promise<{ err?: string, data?: any }> {
    try {
        //TODO find out how to use queryAll
        let tempData = await docClient.query(taskModel.getAllTasks(userEmail)).promise()
        const data: any = {}
        // TODO is this even an error if there are no tasks?
        if (tempData.Count == 0) {
            return {err: "No tasks found"}
        }
        tempData.Items!.forEach((val) => {
            const tempVal = val.originalItem() as any
            delete tempVal.userID
            data[tempVal.taskId] = val.originalItem()
        })
        console.log(data)
        return {data}
    } catch (err) {
        return {err}
    }
}