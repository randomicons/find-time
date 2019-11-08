import aws from 'aws-sdk'
import * as taskModel from "../model/task.model"

const docClient = new aws.DynamoDB.DocumentClient()

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

export async function getTasks(userId: string): Promise<{ err?: string, data?: any }> {
    try {
        //TODO find out how to use queryAll
        let tempData = await taskModel.query({userId: {eq: userId}}).exec()
        const data: any = {}
        tempData.forEach((val) => {
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