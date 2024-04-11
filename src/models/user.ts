import { IUser } from '@root/interfaces';
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        studentId: { type: String, required: true, unique: true },
        verified: { type: Boolean, default: false },
        rating: { type: Number, default: 0 },
        reviews: [
            {
                reviewID: { type: Schema.Types.ObjectId, ref: 'Review' },
            },
        ],

    },
    { timestamps: true }
)


const modelName = 'User';
const collectionName = 'users';


export default mongoose.primary.model<IUser>(modelName, schema, collectionName);