import { Router } from 'express'
import CourseRouter from './course'
import AuthRouter from './auth'
import StudentRouter from './student'
import ReviewRouter from './review'

const router = Router()

router.use('/course', CourseRouter)
router.use('/auth', AuthRouter)
router.use('/review', ReviewRouter)
router.use('/student', StudentRouter)
export default router