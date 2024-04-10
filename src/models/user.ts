import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        name: { type: String, required: true },
        studentId: { type: String, required: true, unique: true },
        rating: { type: Number, required: true },
        courseReviews: [
            {
                reviewID: { type: Schema.Types.ObjectId, ref: 'Review' },
            },
        ],

    },
    { timestamps: true }
)


const modelName = 'User';
const collectionName = 'users';


export default mongoose.primary.model(modelName, schema, collectionName);