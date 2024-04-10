import { ICourse } from '@root/interfaces';
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },

    },
    { timestamps: true }
)

const modelName = 'Course';
const collectionName = 'courses';

export default mongoose.primary.model<ICourse>(modelName, schema, collectionName);