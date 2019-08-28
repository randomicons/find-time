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
// test route
// router.get('/test', user_controller.test)
//
router.post('/create', (req: Request, res: Response) => {
    createUser(req.body)
        .then(() => res.send("account created"))
        .catch(err => {
            console.log(err);
            res.status(500).send("error account not created" + err)
        })

})
router.post('/login', (req: Request, res: Response) => {
    loginUser(req.body).catch(err => {
        console.log(err)
        res.status(500).send("couldn't log in")

    })
})
//
// router.get('/:id', user_controller.user_details)
//
// router.put('/:id/update', user_controller.user_update)
//
// router.delete('/:id/delete', user_controller.user_delete)

module.exports = router