import { Document } from "mongoose";

export interface IBaseCourse extends Document {
    name: string;
    code: string;
}

export interface ICourse extends IBaseCourse, Document { }
export type ICourseCreate = Partial<IBaseCourse>