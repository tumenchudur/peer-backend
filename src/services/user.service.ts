import {
    IUser,
    IUserCreate,
    IUserLogin,

} from "@root/interfaces";
import { User } from "@root/models";
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
const UserService = {
    createUser,
    updateUser,
    getUserById,
    getUsers,
    getUser,
    getReviews
};

export default UserService;
