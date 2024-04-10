import { Course } from '@root/models'
import { ICourseCreate, ICourse } from '@root/interfaces';
import { Types } from 'mongoose'

export const createCourse = async (data: ICourseCreate): Promise<ICourse> => {
    const result = await Course.create(data)

    return result
}
export const getAllCourses = async (filter: any): Promise<ICourse[]> => {
    const result = await Course.find(filter)

    return result
}

export const getCourseById = async (id: Types.ObjectId): Promise<ICourse> => {
    const result = await Course.findById(id)

    return result
}
export const createManyCourses = async (courses: ICourseCreate[]): Promise<ICourse[]> => {
    const result = await Course.insertMany(courses)

    return result
}
const CourseService = {
    createCourse,
    getAllCourses,
    getCourseById,
    createManyCourses
}

export default CourseService