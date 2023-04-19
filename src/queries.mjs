import bcrypt from 'bcrypt'
import pkg from "pg"
const { Pool } = pkg


const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'apiDb',
    password: 'password',
    port: 5432
})

export function getAdmins(req, res) {
    pool.query('SELECT * FROM admins order by id asc', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

export function searchAdmin(name) {
    return new Promise((resolve, reject) => {
        pool.query('select * from admins where name = $1', [name],
            (error, results) => {
                if (!results.rowCount) reject('invalid data')
                else resolve(results.rows)
            })
    })
}

export async function newAdmin(req, res) {
    const { name, password } = req.body

    if (!name || !password) return res.status(401).json({ error: 'dados invalidos' })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    pool.query('insert into admins (name, password, accesslevel) values ($1, $2, $3)',
        [name, hash, 2],
        (err, results) => {
            if (err) throw err
            return res.status(200).json({ message: 'Admin registered whith success' })
        })
}


export async function registerUser(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) return res.status(401).json({ error: 'dados invalidos' })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    pool.query('insert into users (name, email, password, accessLevel) values ($1, $2, $3, $4) returning *',
        [name, email, hash, 3],
        (err, results) => {
            if (err) throw err

            res.status(200).json({ message: `User created with ID: ${results.rows[0].id}` })
        })
}

export function getAllUsers(req, res) {
    pool.query('select * from users order by id asc', (err, results) => {
        if (err) throw err

        res.status(200).json(results.rows)
    })
}