import {checkAuth} from '../middleware/checkAuth'
import {Request, Response} from 'express'
import {addTask, deleteTask, getTasks, updateTask} from "../services/TaskService";
import {Task, User} from "../interfaces";

export const taskRoutes = require('express').Router()


taskRoutes.post('/add', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await addTask(req.body as Task, req.user.email)
    if (err) {
        res.status(401).send(err)
    } else {
        res.status(200).send("tasks added")
    }
})


taskRoutes.post('/delete', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await deleteTask(req.body as Task, req.user.email)
    if (err) {
        console.log(err)
        res.status(500).send(err)
    } else {
        res.status(200).send("task deleted")
    }
})
taskRoutes.post("/update", checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await updateTask(req.body as Task, req.user.email)
    if (err) {
        console.log(err)
        res.status(401).send(err)
    } else {
        res.status(200).send("task updated")
    }
})
taskRoutes.get('/', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {data, err} = await getTasks(req.user.email)
    if (err) {
        console.log(err)
        res.status(401).send(err)
    } else {
        res.status(200).send(data)
    }
})



