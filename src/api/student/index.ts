import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import { getStudent, getStudents } from './student.controller'



const StudentRouter = Router()

StudentRouter.get('/', asyncHandler(getStudents))
StudentRouter.get('/:id', asyncHandler(getStudent))

export default StudentRouter
