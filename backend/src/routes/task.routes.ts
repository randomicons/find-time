import {checkAuth} from '../middleware/checkAuth'
import {Request, Response} from 'express'
import {addTask} from "../services/TaskService";

export const taskRoutes = require('express').Router()

taskRoutes.post('/add', checkAuth, async (req: Request & { user: any }, res: Response) => {
    console.log(req.user)
    const {error} = await addTask(req.body, req.user.userId)
    if (error) {
        res.status(500).send(error)
    } else {
        res.status(200).send("task added")
    }
})

