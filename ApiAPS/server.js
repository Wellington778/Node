const express = require('express')
const userRouter = require('./src/routes/user.route');
const authRoute = require('./src/routes/login.route');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.status(200).json({"message": "OK"})
})

app.use('/login', authRoute)
app.use('/users', userRouter)

module.exports = app