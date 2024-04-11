import { IReview, IReviewCreate } from '@root/interfaces';
import { Types } from 'mongoose'

import { Review } from '@root/models'

export const createReview = async (data: IReviewCreate): Promise<IReview> => {
    const result = await Review.create(data)

    return result
}

export const getReviews = async (filter: any): Promise<IReview[]> => {
    const result = await Review.find(filter)
        .populate('reviewedStudent')
        .populate('author')
        .populate('course')
    return result

}

export const getReviewById = async (id: Types.ObjectId): Promise<IReview> => {
    const result = await Review.findById(id)
        .populate('reviewedStudent')
        .populate('author')
        .populate('course')
    return result
}

export const updateReview = async (id: Types.ObjectId, data: IReview): Promise<IReview> => {
    const result = await Review.findOneAndUpdate({ _id: id }, data, { new: true })
    return result
}

export const deleteReview = async (id: Types.ObjectId): Promise<IReview> => {
    const result = await Review.findOneAndDelete({ _id: id })
    return result
}

const ReviewService = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
}

export default ReviewService