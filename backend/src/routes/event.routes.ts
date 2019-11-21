import {checkAuth} from '../middleware/checkAuth'
import {Request, Response} from 'express'
import {addEvent, deleteEvent, getEvents, updateEvent} from "../services/EventService";
import {Event, User} from "../interfaces";

export const eventRoutes = require('express').Router()


eventRoutes.post('/add', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await addEvent(req.body as Event, req.user.email)
    if (err) {
        console.log(err)
        res.status(401).send(err)
    } else {
        res.status(200).send("events added")
    }
})


eventRoutes.post('/delete', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await deleteEvent(req.body as Event, req.user.email)
    if (err) {
        console.log(err)
        res.status(500).send(err)
    } else {
        res.status(200).send("event deleted")
    }
})
eventRoutes.post("/update", checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {err} = await updateEvent(req.body as Event, req.user.email)
    if (err) {
        console.log(err)
        res.status(401).send(err)
    } else {
        res.status(200).send("event updated")
    }
})
eventRoutes.get('/', checkAuth, async (req: Request & { user: User }, res: Response) => {
    const {data, err} = await getEvents(req.user.email)
    if (err) {
        console.log(err)
        res.status(401).send(err)
    } else {
        res.status(200).send(data)
    }
})



