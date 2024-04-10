import asyncHandler from 'express-async-handler'
import { Router } from 'express'

import {
    login,
    register,
    registerMany
} from './auth.controller'


const AuthRouter = Router()

AuthRouter.post('/login', asyncHandler(login))
AuthRouter.post('/register', asyncHandler(register))
AuthRouter.post('/register-many', asyncHandler(registerMany))


export default AuthRouter