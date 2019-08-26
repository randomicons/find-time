const express = require("express")
const router = express.Router()

const user_controller = require('../controller/user.controller')


// test route
// router.get('/test', user_controller.test)
//
router.post('/create', user_controller.create_user)
//
// router.get('/:id', user_controller.user_details)
//
// router.put('/:id/update', user_controller.user_update)
//
// router.delete('/:id/delete', user_controller.user_delete)

module.exports = router