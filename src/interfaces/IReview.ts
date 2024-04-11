
import { Document } from 'mongoose';
import { IUser } from './IUser';
import { ICourse } from './ICourse';

interface ISkillScore {
    questionCount: number;
    score: number;
}

export interface IBaseReview extends Document {
    author: IUser['_id']
    course: ICourse['_id']
    reviewedStudent: IUser['_id']
    rating: number
    communication: number
    teamwork: number
    problemSolving: number
    creativity: number
    leadership: number
    comment: string

}

export interface IReview extends IBaseReview, Document { }

export interface IReviewCreate {
    author: IUser['_id']
    course: ICourse['_id']
    reviewedStudent: IUser['_id']
    communication: number
    teamwork: number
    problemSolving: number
    creativity: number
    leadership: number
    comment: string
}