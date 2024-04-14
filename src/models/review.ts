import mongoose from 'mongoose';
import { IReview } from '@root/interfaces';


const reviewSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    reviewedStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    communication: { type: Number, required: true, min: 1, max: 5 },
    teamwork: { type: Number, required: true, min: 1, max: 5 },
    problemSolving: { type: Number, required: true, min: 1, max: 5 },
    creativity: { type: Number, required: true, min: 1, max: 5 },
    leadership: { type: Number, required: true, min: 1, max: 5 },

    comment: { type: String, required: true },

}, { timestamps: true });


const modelName = 'Review';
const collectionName = 'reviews';


export default mongoose.primary.model<IReview>(modelName, reviewSchema, collectionName);