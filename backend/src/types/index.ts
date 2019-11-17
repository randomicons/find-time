export interface Task {
    id: string,
    name: string,
    duration: string
    deadline?: string
}

export interface User {
    email: string,
    dateCreated: string,
    password: string
}
