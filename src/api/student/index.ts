import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import { getStudent, getStudents, getUserWithMostReviewsGiven } from './student.controller'



const StudentRouter = Router()

StudentRouter.get('/top-reviewer', asyncHandler(getUserWithMostReviewsGiven))
StudentRouter.get('/', asyncHandler(getStudents))
StudentRouter.get('/:id', asyncHandler(getStudent))

export default StudentRouter
