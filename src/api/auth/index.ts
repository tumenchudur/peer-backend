import asyncHandler from 'express-async-handler'
import { Router } from 'express'

import {
    me,
    login,
    register,
    getJWKSKeys,
} from './auth.controller'
import authenticationMiddleware from '@root/middleware/authentication'


const AuthRouter = Router()

AuthRouter.post('/login', asyncHandler(login))
AuthRouter.post('/register', asyncHandler(register))
AuthRouter.get('/me', authenticationMiddleware.checkJwt, asyncHandler(me))
AuthRouter.get('/jwks', asyncHandler(getJWKSKeys))

export default AuthRouter