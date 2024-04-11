import { Request, Response } from 'express'
import { IReview, IReviewCreate, IUser } from '@root/interfaces';
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

    const data: IReviewCreate = {
        author: user.claims._id,
        reviewedStudent,
        rating: 0,
        course,
        communication,
        teamwork,
        problemSolving,
        creativity,
        leadership,
        comment,
    };

    try {

        const review = new Review(data);

        review.rating = Math.round((review.communication + review.teamwork + review.problemSolving + review.creativity + review.leadership) / 5 * 100) / 100;

        // check if the user has already reviewed the student with the same course

        const existingReview = await Review.findOne({ author: user.claims._id, reviewedStudent, course });
        if (existingReview) {
            throw new Error('You have already reviewed this student for this course');
        }

        const savedReview = await review.save();

        // Save the review with calculated rating

        // Update user rating and skills after saving
        const updatedUser = await updateReviewedUser(savedReview);

        res.respondWithData(savedReview, { user: updatedUser }); // Send response with review and updated user
    } catch (error) {
        res.internalError(error);
    }
}

async function updateReviewedUser(review: IReview): Promise<IUser> {
    const user = await UserService.getUserById(review.reviewedStudent);
    if (!user) {
        throw new Error('User not found');
    }

    const reviews = await Review.find({ reviewedStudent: review.reviewedStudent });
    if (reviews.length === 0) {
        throw new Error('No reviews found');
    }

    let totalRating = 0;
    const skills = {} as { [key: string]: number };

    for (const review of reviews) {
        totalRating += review.rating;
        skills["communication"] = (skills[review.communication] || 0) + review.communication;
        skills["teamwork"] = (skills[review.teamwork] || 0) + review.teamwork;
        skills["problemSolving"] = (skills[review.problemSolving] || 0) + review.problemSolving;
        skills["creativity"] = (skills[review.creativity] || 0) + review.creativity;
        skills["leadership"] = (skills[review.leadership] || 0) + review.leadership;
    }

    user.rating = Math.round((totalRating / reviews.length) * 100) / 100;
    user.reviews = reviews.map(review => review._id);
    user.skills = Object.entries(skills).map(([type, rating]) => ({ type, rating: rating / reviews.length }));

    await user.save();
    return user;
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