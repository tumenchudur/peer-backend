import { Request, Response } from 'express'
import { IReview, IReviewCreate } from '@root/interfaces';
import { ReviewService } from '@root/services';
import { Types } from 'mongoose'

export async function createReview(req: Request, res: Response): Promise<void> {
    const {
        reviewedStudent,
        course,
        communication,
        teamwork,
        problemSolving,
        creativity,
        leadership,
        comment
    } = req.body

    const { user } = req
    console.log(user);
    const data: IReviewCreate = {
        author: user.claims._id,
        reviewedStudent,
        course,
        communication,
        teamwork,
        problemSolving,
        creativity,
        leadership,
        comment,

    }

    try {
        const result = await ReviewService.createReview(data)
        res.respondWithData(result)
    }
    catch (error) {
        res.internalError(error)
    }
}

export async function getReviews(req: Request, res: Response): Promise<void> {
    const { filter } = req.query

    try {
        const result = await ReviewService.getReviews(JSON.parse(filter as string))
        res.respondWithData(result)
    }
    catch (error) {
        res.internalError(error)
    }
}

export async function getReviewById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
        const result = await ReviewService.getReviewById(new Types.ObjectId(id))
        res.respondWithData(result)
    }
    catch (error) {
        res.internalError(error)
    }
}