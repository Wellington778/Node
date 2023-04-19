import express from 'express'
import { adminAuth, logout, verifyJwt } from '../src/auth.mjs'
import { getAdmins, newAdmin } from '../src/queries.mjs'
import { users } from './users.mjs'
export const dashboard = express.Router()

// dashboard.use(verifyJwt)

dashboard.get('/login', adminAuth)
dashboard.get('/logout', logout)

dashboard.use(verifyJwt)
dashboard.use('/users', users)
dashboard.get ('/admins', getAdmins)
dashboard.post('/admins', newAdmin)