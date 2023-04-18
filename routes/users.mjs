import express from 'express'
import { getAllUsers, registerUser } from '../src/queries.mjs'
export const users = express.Router()

users.get('/', getAllUsers)
users.post('/', registerUser)