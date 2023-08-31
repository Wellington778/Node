const express = require('express')
const { registerNewUser, getAllUsers } = require('../queries/queries')
const userRouter = express.Router()

userRouter.route('/')
    .get(getAllUsers)
    .post(registerNewUser)

module.exports = userRouter