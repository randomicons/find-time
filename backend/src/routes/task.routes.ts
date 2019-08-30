import {checkAuth} from '../middleware/checkAuth'
import {Request, Response} from 'express'
import {addTask, getTasks} from "../services/TaskService";

export const taskRoutes = require('express').Router()

taskRoutes.post('/add', checkAuth, async (req: Request & { user: any }, res: Response) => {
    const {err} = await addTask(req.body, req.user.userId)
    if (err) {
        res.status(401).send(err)
    } else {
        res.status(200).send("task added")
    }
})

taskRoutes.get('/', checkAuth, async (req: Request & { user: any }, res: Response) => {
    const {data, err} = await getTasks(req.user.userId)
    if (err) {
        res.status(401).send(err)
    } else {
        res.status(200).send(data)
    }
})



