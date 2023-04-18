import express from 'express'
import { registerUser } from '../src/queries.mjs'
export const register = express.Router()

register.post('', registerUser)