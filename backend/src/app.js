//@flow
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/users', userRoutes)

const port = 1234
app.listen(port, () => {
  console.log('server is up and running on port number: ' + port)
})
