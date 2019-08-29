import {taskModel} from "../constants";

interface Task {
    taskId: String
    userId: String
    duration: String
    deadline?: String
}

export async function addTask(taskInput: Task, userId: String): Promise<{ error?: String }> {
    try {
        const val = await new taskModel({...taskInput, userId}).save({condition: "attribute_not_exists(taskId)"})
        console.log(val)
    } catch (error) {
        return {error}
    }
    return {}
}