import { Router } from 'express'
import CourseRouter from './course'

const router = Router()

router.use('/course', CourseRouter)

export default router