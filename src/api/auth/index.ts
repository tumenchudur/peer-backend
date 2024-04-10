import asyncHandler from 'express-async-handler'
import { Router } from 'express'

import {
    me,
    login,
    register,
} from './auth.controller'


const AuthRouter = Router()

AuthRouter.post('/login', asyncHandler(login))
AuthRouter.post('/register', asyncHandler(register))
AuthRouter.post('/me', asyncHandler(me))

export default AuthRouter