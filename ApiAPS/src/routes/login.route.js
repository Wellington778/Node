const express = require('express')
const authRoute = express.Router()
const basicAuth = require('basic-auth')
let bcrypt = require('bcrypt')

let {searchUserFromEmail, pool} = require('../queries/queries')

authRoute.post('/', (req, res) => {
    const {name, pass} = basicAuth(req)
    // res.send(`${name}, ${pass}`)
    pool.query("SELECT * FROM users WHERE email=$1", [name],
        async (err, results) => {
            if(err) throw(err)
            if(!results) res.status(400).json({"error":"invalid email or password (but here was email)"})


            res.send( `${ await bcrypt.compare(pass, results.rows[0].hash)}`  )
        }
    )

})

// authRoute.get('/', (req, res) => {
//     res.status(201).json({"message": "ALGUEM ME AJUDA"})
// })

module.exports = authRoute