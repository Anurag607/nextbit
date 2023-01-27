import express from 'express'
import bcrypt from 'bcryptjs'
import morgan from 'morgan'
import { registerUser, loginUser } from '../controllers/auth.mjs'

const router = express.Router()
router.use(morgan('dev'))
router.use((rqe, res, next) => {
    console.log("Auth Router Running!")
    next()
})


router.post('/register', registerUser)
router.post('/login', loginUser)

export default router