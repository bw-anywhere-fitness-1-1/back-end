const express = require('express')
const server = express()
const UsersRouter = require('../users/users-router')
const AuthRouter = require('../auth/auth-router')
const cors = require("cors");


  
server.use(cors());
server.use(express.json())
server.use('/api/', UsersRouter)
server.use('/api/auth', AuthRouter)



module.exports = server;