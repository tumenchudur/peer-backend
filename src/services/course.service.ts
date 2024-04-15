import { Course, Review } from '@root/models'
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
export const getMostReviewedCourses = async (): Promise<any> => {
    const result = await Review.aggregate([
        {
            $group: {
                _id: '$course',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: '_id',
                as: 'course'
            }
        },
        {
            $unwind: '$course'
        },
        {
            $project: {
                _id: 0,
                course: 1,
                count: 1
            }
        },
        {
            $limit: 5
        }
    ])
    return result
}

const CourseService = {
    createCourse,
    getAllCourses,
    getCourseById,
    createManyCourses,
    getMostReviewedCourses
}

export default CourseService