import mongoose from 'mongoose';

// export interface ISkillQuestion extends mongoose.Document {
//     _id?: mongoose.Schema.Types.ObjectId;
//     skill: string; // Reference to the associated skill
//     text: string; // The actual question text
//     type: string; // Optional: Type of question (e.g., "multiple-choice", "likert-scale")
//     ratingScale?: number[]; // Optional: Array of possible ratings for the question (e.g., [1, 2, 3, 4, 5])
//     options?: string[]; // Optional: Array of options for multiple-choice questions
//     order: number; // Index for displaying questions in a specific order
// }

const skillQuestionSchema = new mongoose.Schema(
    {
        skill: { type: String, required: true },
        text: { type: String, required: true },
        group: { type: String, enum: ['communication', 'teamwork', 'problemSolving', 'creativity', 'leadership'], required: true },
        type: { type: String, default: "likert-scale" },
        ratingScale: { type: Array, default: [1, 2, 3, 4, 5] }, // Default 1-5 likert scale
        options: { type: Array },
        order: { type: Number, required: true },
    }
);
const modelName = 'SkillQuestion';
const collectionName = 'skillQuestions';

export default mongoose.primary.model(modelName, skillQuestionSchema, collectionName);
