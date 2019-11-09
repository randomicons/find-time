import {checkAuth} from '../middleware/checkAuth'
import {Request, Response} from 'express'
import {addTask, getTasks} from "../services/TaskService";
import {Task, User} from "../types";

export const taskRoutes = require('express').Router()


taskRoutes.post('/add', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await addTask(req.body as Task, req.user.email)
    if (err) {
        res.status(401).send(err)
    } else {
        res.status(200).send("task added")
    }
})

taskRoutes.get('/', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {data, err} = await getTasks(req.user.email)
    if (err) {
        res.status(401).send(err)
    } else {
        res.status(200).send(data)
    }
})



