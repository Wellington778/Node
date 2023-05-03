import auth from "basic-auth"
import { searchAdmin } from "./queries.mjs"
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign, verify } = pkg

const SECRET = 'heheBoy'



export function verifyJwt(req, res, next) {
    const token = req.session.jwtToken
    if (!token) {
        return res.status(401).json({ message: 'no token' })
    }
    verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: `failed to autenticate token || ${err}` })
        }

        next()
    })
}

export async function adminAuth(req, res) {
    const { name, pass } = auth(req)

    searchAdmin(name)
        .then(data => data[0])// return the object from array
        .then(async ({ id, name, password }) => { // destructuring object
            
            // await the verification of password
            const verify = await bcrypt.compare(pass, password)
            if (!verify) return Promise.reject('Dados invalidos')

            // if pass, create token
            const token = sign({ id }, SECRET, { expiresIn: 14400 })

            // assign the variables to session
            req.session.jwtToken = token
            req.session.userId = id
            req.session.username = name

            return res.json({ auth: 'true', token })
        })
        .catch(err => res.status(401).json({ 'message': err }))
}



export function logout(req, res, next) {
        req.session.destroy()
        return res.status(200).json({ message: 'admin logged out' })
}