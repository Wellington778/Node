const encryptPassword = require('../security/encrypt')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: '78gh3gf3',
    port: 5432,
})

async function registerNewUser(req, res){
    const {name, email, password} = req.body

    const hash = await encryptPassword(password)

    pool.query("INSERT INTO users (name, email, hash) VALUES ($1, $2, $3) RETURNING ID", 
                [name, email, hash], (err, result) => {
                    if(err)
                        throw err
                    // console.log(rows)
                    res.status(201).send(`user registered\nId: ${result.rows[0].id}`)
                })
}

function getAllUsers(req, res) {
    pool.query("SELECT * FROM users ORDER BY id ASC", (err, rows) => {
        if(err)
            throw (err)
        res.status(201).send(rows.rows)
    })
}

function searchUserFromEmail(email){
    return new Promise( (resolve, reject) => {
        pool.query("SELECT * FROM users WHERE email='$1'", [email], (err, results) => {
            if(err) reject(err)
            // if(!results) reject({"message": "Invalid data CHANGE THIS LATER"})
            
            resolve(results)
        })  
    } )
}

module.exports = {
    pool,
    registerNewUser,
    getAllUsers,
    searchUserFromEmail
}