import { Router } from 'express'
import CourseRouter from './course'
import AuthRouter from './auth'

const router = Router()

router.use('/course', CourseRouter)
router.use('/auth', AuthRouter)

export default router