import * as express from 'express'
import * as cors from 'cors'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import axios from 'axios'
import * as path from 'path'
import knex from './api/config/knex'

const port = 9001
const app = express()
const server = http.createServer(app)
const router = express.Router()
require(path.join(__dirname, '/server.js'))

import UserController from './api/controllers/UserController'
import IcalController from './api/controllers/IcalController'

setInterval(function () {
  http.get('http://donaldma-api.herokuapp.com')
}, 300000)

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next()
})

app.use('/api/user', UserController)
app.use('/api/ical', IcalController)

server.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${port}`)
})