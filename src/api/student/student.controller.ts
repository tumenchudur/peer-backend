import { Types } from 'mongoose';
import {
    UserService
} from '@root/services'
import { Request, Response } from 'express'

export async function getStudent(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {

        // return reviews with user
        const result = await UserService.getUserById(new Types.ObjectId(id))

        if (result) {
            const userWithoutPassword = result.toObject();
            delete userWithoutPassword.password;

            const reviews = await UserService.getReviews(new Types.ObjectId(id));
            userWithoutPassword.reviews = reviews[0]?.reviews || [];

            res.respondWithData(userWithoutPassword);

        }

    }
    catch (error) {
        res.internalError(error)
    }
}
export async function getStudents(req: Request, res: Response): Promise<void> {
    try {
        const search = (req.query.search as string)?.trim() || '';
        // req.query.rating
        const rating = (req.query.rating as string)?.trim() || '';


        const result = await UserService.getUsers({ search, rating });

        if (!result) {
            res.respondWithData([]);
            return;
        }

        const students = result.map(item => {
            const userWithoutPassword = item.toObject();
            delete userWithoutPassword.password;
            return userWithoutPassword;
        });

        res.respondWithData(students);
    } catch (error) {
        res.internalError(error);
    }
}

export async function getUserWithMostReviewsGiven(req: Request, res: Response): Promise<void> {
    try {
        const result = await UserService.getUserWithMostReviewsGiven();
        res.respondWithData(result);
    } catch (error) {
        res.internalError(error);
    }
}