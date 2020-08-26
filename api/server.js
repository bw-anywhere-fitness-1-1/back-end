const express = require('express')
const server = express()
const UsersRouter = require('../users/users-router')
const AuthRouter = require('../auth/auth-router')
const cors = require("cors");



var whitelist = ['https://front-end-snowy-rho.vercel.app/', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


server.use(express.json())
server.use('/api/', UsersRouter)
server.use('/api/auth', AuthRouter)
server.use(cors(corsOptions));



module.exports = server;