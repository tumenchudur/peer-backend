// import config from '@root/config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
// import jose from 'node-jose'
// import fs from 'fs'

// const JWKeys = fs.readFileSync('Keys.json')
// const rsaKeys = JSON.parse(JWKeys.toString());
// console.log("🚀🚀🚀🚀🚀 ~ rsaKeys:", rsaKeys)

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 100,
        jwksUri: `http://18.138.55.47:3080/api/v1/auth/jwks`
    }),
    // issuer: config.oauth.host,
    algorithms: ['RS256']
})

const checkVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | any> => {
    const { user } = req

    if (!user.claims.verified) {
        return res.resourceForbidden(new Error('Баталгаажуулна уу!'))
    }
    next()
}

const customMiddleware = async (req: any, res: any, next: () => void) => {

    if (!req.headers.authorization) {
        req.user = "anonymous"
        return next()
    }
    if (req.headers.authorization.includes('Bearer')) {
        // console.log('Right HEREE', req.headers.authorization)
        return checkJwt(req, res, next)
    }

    return next()
}

const authenticationMiddleware = {
    checkJwt,
    checkVerification,
    customMiddleware
}

export default authenticationMiddleware
