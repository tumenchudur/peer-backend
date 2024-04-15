import { Review } from '@root/models';
import { Router } from 'express'
import asyncHandler from 'express-async-handler';
import { createReview, getMyReviews, getReviews } from './review.controller'
import authenticationMiddleware from '@root/middleware/authentication';



const ReviewRouter = Router()

// my review
ReviewRouter.get('/my', authenticationMiddleware.checkJwt, asyncHandler(getMyReviews))
ReviewRouter.get('/', asyncHandler(getReviews))
ReviewRouter.post('/', authenticationMiddleware.checkJwt, asyncHandler(createReview))


export default ReviewRouter