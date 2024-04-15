
import asyncHandler from 'express-async-handler'
import { Router } from 'express'

import {
    createCourse,
    getAllCourses,
    getCourseById,
    getMostReviewedCourses
} from './course.controller'


const CourseRouter = Router()

CourseRouter.get('/most-reviewed', asyncHandler(getMostReviewedCourses))
CourseRouter.get('/:id', asyncHandler(getCourseById))
CourseRouter.get('/', asyncHandler(getAllCourses))
CourseRouter.post('/', asyncHandler(createCourse))


export default CourseRouter