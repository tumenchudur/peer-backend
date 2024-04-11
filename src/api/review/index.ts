import { Router } from 'express'
import asyncHandler from 'express-async-handler';
import { createReview } from './review.controller'



const ReviewRouter = Router()

ReviewRouter.post('/', asyncHandler(createReview))


export default ReviewRouter