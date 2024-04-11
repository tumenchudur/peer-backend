import { Router } from 'express'
import asyncHandler from 'express-async-handler';
import { createReview } from './review.controller'
import authenticationMiddleware from '@root/middleware/authentication';



const ReviewRouter = Router()

ReviewRouter.post('/', authenticationMiddleware.checkJwt, asyncHandler(createReview))


export default ReviewRouter