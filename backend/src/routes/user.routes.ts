import {createUser, loginUser} from "../services/UserService";
import {Request, Response} from 'express'

const express = require("express")
export const userRoutes = express.Router()


userRoutes.post('/create', (req: Request, res: Response) => {
    createUser(req.body)
        .then((result) => {
            const {err, out} = result as any
            if (err) {
                console.log(err);
                res.status(500).send("error account not created" + err)
            }
            res.cookie("token", out.token, {maxAge: out.maxAge})
            res.send("account created")
        })
        .catch(err => {
        })
})

userRoutes.post('/login', async (req: Request, res: Response) => {
    const {error, out} = await loginUser(req.body)
    if (error) res.status(401).send(error)
    else if (out) {
        res.cookie("token", out.token, {maxAge: out.maxAge})
        res.status(201).send(out);
    }
})


