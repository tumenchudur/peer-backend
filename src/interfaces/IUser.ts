import { Document } from 'mongoose';

export interface IBaseUser extends Document {
    firstName: string;
    lastName: string;
    studentId: string;
    password: string;
    rating: number;
    verified: boolean;
    reviews: [];
}

export interface IUser extends IBaseUser, Document { }

export interface IUserCreate {
    firstName: string;
    lastName: string;
    studentId: string;
    password: string;
}
export interface IUserLogin {
    studentId: string;
    password: string;
}