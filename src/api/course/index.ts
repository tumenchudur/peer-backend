import asyncHandler from 'express-async-handler'
import { Router } from 'express'

import {
    createCourse,
    getAllCourses,
    getCourseById
} from './course.controller'

const CourseRouter = Router()

CourseRouter.get('/:id', asyncHandler(getCourseById))
CourseRouter.get('/', asyncHandler(getAllCourses))
CourseRouter.post('/', asyncHandler(createCourse))
// CourseRouter.post('/create-many', asyncHandler(createManyCourses))


export default CourseRouter