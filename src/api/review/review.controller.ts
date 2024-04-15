import { Request, Response } from 'express'
import { IReviewCreate } from '@root/interfaces';
import { ReviewService, UserService } from '@root/services';
import { Types } from 'mongoose'
import { Review } from '@root/models';

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
    } = req.body;

    const { user } = req;

    try {



        const existingReview = await Review.findOne({ author: user.claims._id, reviewedStudent, course });
        if (existingReview) {
            throw new Error('You have already reviewed this student for this course');
        }

        const data: IReviewCreate = {
            author: user.claims._id,
            rating: 0,
            reviewedStudent,
            course,
            communication,
            teamwork,
            problemSolving,
            creativity,
            leadership,
            comment

        }
        data.rating = Math.round((data.communication + data.teamwork + data.problemSolving + data.creativity + data.leadership) / 5 * 100) / 100;

        // const savedReview = await review.save();
        const savedReview = await ReviewService.createReview(data);
        // Save the review with calculated rating


        const userUpdate = await UserService.addReview(reviewedStudent)
        res.respondWithData(savedReview); // Send response with review and updated user
    } catch (error) {
        res.internalError(error);
    }
}


export async function getMyReviews(req: Request, res: Response): Promise<void> {
    const { user } = req;

    try {
        const reviews = await ReviewService.getReviews({ author: user.claims._id });
        res.respondWithData(reviews);
    } catch (error) {
        res.internalError(error);
    }
}

export async function getReviews(req: Request, res: Response): Promise<void> {
    const { filter } = req.query

    try {
        const result = await ReviewService.getReviews((filter))
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
