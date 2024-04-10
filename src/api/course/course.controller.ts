import { Request, Response } from 'express'
import { Types } from 'mongoose'
import CourseService from '@root/services/course.service'
import { ICourseCreate } from '@root/interfaces'


export async function createCourse(req: Request, res: Response): Promise<void> {
    const { name, code } = req.body

    const data: ICourseCreate = {
        name,
        code
    }
    try {
        const result = await CourseService.createCourse(data)
        res.respondWithData(result)
    }
    catch (error) {
        res.internalError(error)
    }
}

export async function createManyCourses(req: Request, res: Response): Promise<void> {
    const courses = req.body
    console.log(courses);
    try {
        const result = await CourseService.createManyCourses(courses)
        res.respondWithData(result)
    }
    catch (error) {
        res.internalError(error)
    }
}
export async function getAllCourses(req: Request, res: Response): Promise<void> {
    try {
        const search = (req.query.search as string)?.trim() || '';


        const result = await CourseService.getAllCourses({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
            ],
        });

        res.json(result);


    }
    catch (error) {
        res.internalError(error)
    }
}

export async function getCourseById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
        const result = await CourseService.getCourseById(new Types.ObjectId(id))
        res.respondWithData(result)
    }
    catch (error) {
        res.internalError(error)
    }
}