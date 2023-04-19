import express from 'express'
import bodyParser from 'body-parser'
import { log } from './src/log.mjs'
import { dashboard } from './routes/dashboard.mjs'
import { register } from './routes/register.mjs'
import session from 'express-session'

export const dir = 'C:/Users/Wellington/Desktop/JavaScript/node/auth/'

const app = express()
const port = 8080


// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// session
app.use(session({
    secret: 'eyebrowRaise',
    saveUninitialized: false,
    resave: false,
    
    cookie: {
        httpOnly: true,
        maxAge: 60*60*1000
    }
}))


// loggler middleware
app.use(log)

// user register route
app.use('/register', register)

// dashboard
// dashboard will contain:
// dashboard login/logoff route
// users routes
app.use('/dashboard', dashboard)

app.listen(port, () => {
    console.log('init')
})