import {createUser, loginUser} from "../services/UserService";
import {Request, Response} from 'express'

const express = require("express")
const router = express.Router()
const dynamoose = require('dynamoose')
const constants = require('../constants')


dynamoose.AWS.config.update({
    region: constants.aws_region,
});

dynamoose.local(); // This defaults to "http://localhost:8000"
router.post('/create', (req: Request, res: Response) => {
    createUser(req.body)
        .then(() => res.send("account created"))
        .catch(err => {
            console.log(err);
            res.status(500).send("error account not created" + err)
        })

})

router.post('/login', async (req: Request, res: Response) => {
    const {error, out} = await loginUser(req.body)
    if (error) res.status(401).send(error)
    else if (out) {
        res.cookie("token", out.token, {maxAge: out.expire})
        res.status(201).send(out);
    }
})

module.exports = router

