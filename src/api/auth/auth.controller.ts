import { Types } from 'mongoose';
import {
    UserService
} from '@root/services'
import { Request, Response } from 'express'
import fs from 'fs'
import jose from 'node-jose'
import { CryptoHelpers } from '@root/utils'
import { IUserCreate, IUserLogin } from '@root/interfaces'

export async function login(req: Request, res: Response): Promise<void> {

    const { studentId, password } = req.body
    let token, user
    try {
        // lowercase studentId


        const encryptedPassword = CryptoHelpers.encrypt(password)
        const login: IUserLogin = {
            studentId: studentId.toLowerCase(),
            password: encryptedPassword
        }
        user = await UserService.getUser(login)
        if (!user) {
            throw 'Нэр эсвэл нууц үг буруу байна.'
        }

        const JWKeys = fs.readFileSync('Keys.json')
        const keyStore = await jose.JWK.asKeyStore(JWKeys.toString())
        const [key] = keyStore.all({ use: 'sig' })
        const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }

        const payload = JSON.stringify({
            exp: Math.floor(Date.now() + 864000),
            iat: Math.floor(Date.now() / 1000),
            claims: {
                _id: user._id,
                studentId: user.studentId,
                firstName: user.firstName,
                lastName: user.lastName,
                verified: user.verified
            }
        })

        token = await jose.JWS.createSign(opt, key).update(payload, "utf8").final()
    } catch (error) {
        if (error == 'forbidden') {
            res.resourceForbidden()
        }
        res.badRequest(new Error(error))
    } finally {


        res.respondWithData({
            accessToken: token,
            verified: user.verified,
            studentId: user.studentId,
            firstName: user.firstName,
            lastName: user.lastName
        })

    }
}

export async function register(req: Request, res: Response): Promise<void> {
    const { studentId, password, firstname, lastname } =
        req.body

    let user
    try {
        const existUsers = await UserService.getUser({ studentId: studentId.toLowerCase() })

        if (existUsers) {
            throw 'Бүртгэлтэй хаяг байна өөө.'
        }

        const encryptedPassword = CryptoHelpers.encrypt(password)
        const data: IUserCreate = {
            studentId: studentId.toLowerCase(),
            password: encryptedPassword,
            firstName: firstname,
            lastName: lastname
        }


        user = await UserService.createUser(data)

    } catch (error) {
        res.badRequest(new Error(error))
    } finally {

        res.respondWithData({
            studentId: user.studentId,
            firstName: user.firstName,
            lastName: user.lastName
        })
    }
}

export async function me(req: Request, res: Response): Promise<void> {
    const { user } = req;

    try {

        const existUser = await UserService.getUserById(new Types.ObjectId(user.claims._id));

        if (!existUser) {
            throw new Error("User not found");
        }

        res.respondWithData({
            id: existUser._id,
            studentId: existUser.studentId || null,
            firstname: existUser.firstName || null,
            lastname: existUser.lastName || null,
        });
    } catch (error) {
        console.error("Error in me function:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function getJWKSKeys(req: Request, res: Response): Promise<void> {
    try {
        const ks = fs.readFileSync('Keys.json');

        const keyStore = await jose.JWK.asKeyStore(ks.toString());

        res.send(keyStore.toJSON());
    } catch (error) {
        console.error("Error in getJWKSKeys function:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}
