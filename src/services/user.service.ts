import {
    IUser,
    IUserCreate,
    IUserLogin,

} from "@root/interfaces";
import { Review, User } from "@root/models";
import { Types } from "mongoose";

const createUser = async (data: IUserCreate): Promise<IUser> => {
    const result = await User.create(data)
    return result
}

const updateUser = async (id: Types.ObjectId, data: IUserCreate): Promise<IUser> => {
    const result = await User.findOneAndUpdate({ _id: id, status: 1 }, data, { new: true })
    return result
}

const getUsers = async (search: string): Promise<IUser[]> => {
    const result = await User.find({ $or: [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }, { studentId: { $regex: search, $options: 'i' } }] })
    return result
}



const getUser = async (filter: any): Promise<IUser> => {
    const result = await User.findOne({ ...filter })
    return result
}


const getUserById = async (id: Types.ObjectId): Promise<IUser> => {
    const result = await User.findOne({ _id: id })
    return result
}

const getReviews = async (id: Types.ObjectId): Promise<IUser[]> => {
    const result = await User.aggregate([
        {
            $match: {
                _id: id
            }
        },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'reviewedStudent',
                as: 'reviews'
            }
        }
    ])
    return result
}

const addReview = async (id: Types.ObjectId): Promise<any> => {

    const reviews = await Review.find({ reviewedStudent: id })
    if (reviews.length === 0) {
        throw new Error('No reviews found')
    }

    let totalRating = 0
    const skills = {} as { [key: string]: number }

    for (const review of reviews) {
        totalRating += review.rating
        skills['communication'] = (skills[review.communication] || 0) + review.communication
        skills['teamwork'] = (skills[review.teamwork] || 0) + review.teamwork
        skills['problemSolving'] = (skills[review.problemSolving] || 0) + review.problemSolving
        skills['creativity'] = (skills[review.creativity] || 0) + review.creativity
        skills['leadership'] = (skills[review.leadership] || 0) + review.leadership
    }

    const rating = Math.round((totalRating / reviews.length) * 100) / 100


    const skillOb = Object.entries(skills).map(([type, rating]) => ({ type, rating: rating / reviews.length }))

    const user = await User.updateOne(
        { _id: id },
        {
            $set: {
                rating,
                reviews: reviews.map(review => review._id),
                skills: skillOb
            }
        }
    )

    return user
}




const UserService = {
    createUser,
    updateUser,
    getUserById,
    getUsers,
    getUser,
    addReview,
    getReviews
};

export default UserService;
