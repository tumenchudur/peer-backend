// src/models/review.model.ts

import mongoose from 'mongoose';
// import { IUser } from './user.model';
// import { ICourse } from './course.model';
// import { ISkill } from './skill.model';

// export interface IReview extends mongoose.Document {
//     _id?: mongoose.Schema.Types.ObjectId;
//     author: IUser;
//     course: ICourse;
//     skill: ISkill;
//     rating: number; // Define appropriate rating scale (e.g., 1-5)
//     content: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

const reviewSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    reviewedStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Example rating scale from 1-5
    communication: { type: Object, required: true },
    teamwork: { type: Object, required: true },
    problemSolving: { type: Object, required: true },
    creativity: { type: Object, required: true },
    leadership: { type: Object, required: true },

}, { timestamps: true });


const modelName = 'Review';
const collectionName = 'reviews';

export default mongoose.primary.model(modelName, reviewSchema, collectionName);