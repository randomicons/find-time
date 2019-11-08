interface Task {
    name: string,
    userEmail: string,
    duration: number
    deadline?: number
}

export async function addTask(taskInput: Task, userId: String): Promise<{ err?: String }> {
    try {
        const val = await new taskModel({...taskInput, userId}).save({condition: })
        console.log(val)
    } catch (err) {
        return {err}
    }
    return {}
}

export async function getTasks(userId: String): Promise<{ err?: string, data?: any }> {
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