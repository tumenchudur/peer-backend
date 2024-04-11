import mongoose from 'mongoose';
import { IReview } from '@root/interfaces';


const reviewSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    reviewedStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    communication: { type: Number, required: true, min: 1, max: 5 },
    teamwork: { type: Number, required: true, min: 1, max: 5 },
    problemSolving: { type: Number, required: true, min: 1, max: 5 },
    creativity: { type: Number, required: true, min: 1, max: 5 },
    leadership: { type: Number, required: true, min: 1, max: 5 },

    comment: { type: String, required: true },

}, { timestamps: true });


const modelName = 'Review';
const collectionName = 'reviews';

// on save, update the rating
reviewSchema.pre('save', function (next) {
    const review = this as IReview;
    review.rating = (review.communication + review.teamwork + review.problemSolving + review.creativity + review.leadership) / 5;
    next();
});

// on save and update and delete review, update the user rating and skills

reviewSchema.pre('save', async function (next) {
    const review = this as IReview;
    const User = mongoose.primary.model('User');
    const user = await User.findById(review.reviewedStudent);
    if (!user) {
        throw new Error('User not found');
    }
    const reviews = await mongoose.primary.model('Review').find({ reviewedStudent: review.reviewedStudent });
    let rating = 0;
    let communication = 0;
    let teamwork = 0;
    let problemSolving = 0;
    let creativity = 0;
    let leadership = 0;
    reviews.forEach((review) => {
        rating += review.rating;
        communication += review.communication;
        teamwork += review.teamwork;
        problemSolving += review.problemSolving;
        creativity += review.creativity;
        leadership += review.leadership;
    });
    user.rating = rating / reviews.length;
    user.skills = [
        { type: "communication", rating: communication / reviews.length },
        { type: "teamwork", rating: teamwork / reviews.length },
        { type: "problemSolving", rating: problemSolving / reviews.length },
        { type: "creativity", rating: creativity / reviews.length },
        { type: "leadership", rating: leadership / reviews.length },
    ];
    await user.save();
    next();
});

// reviewSchema.pre('findOneAndUpdate', async function (next) {
//     const review = this as IReview;
//     const User = mongoose.primary.model('User');
//     const user = await User.findById(review.reviewedStudent);
//     if (!user) {
//         throw new Error('User not found');
//     }
//     const reviews = await mongoose.primary.model('Review').find({ reviewedStudent: review.reviewedStudent });
//     let rating = 0;

export default mongoose.primary.model<IReview>(modelName, reviewSchema, collectionName);