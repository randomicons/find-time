export interface Task {
    name: string,
    duration: number
    deadline?: number
}

export interface User {
    email: string,
    dateCreated: number,
    password: string
}
