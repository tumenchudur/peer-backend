import compression from 'compression'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import config from '@root/config'
import logger from '@root/loaders/logger'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'

function configureExpress(app: Express): void {
    // TODO : morgan config
    // Express configuration

    morgan.token('auth_token', (req: Request) => req.headers.authorization)

    app.use(
        morgan(config.logs.morgan, {
            stream: {
                write(text: string): void {
                    logger.info(text, 'HTTP-LOG')
                }
            }
        })
    )

    // File upload
    app.use(fileUpload())

    // CORS
    const { corsAllowedOrigins } = config
    app.use(
        cors({
            origin(origin: string, callback: any) {
                // if (!origin) return callback(null, true)
                // if (corsAllowedOrigins.indexOf(origin) === -1) {
                //     const msg = `The CORS policy for this site does not allow access from the specified Origin.`
                //     return callback(new Error(msg), false)
                // }
                return callback(null, true)
            }
        })
    )

    // gzipping all responses
    app.use(compression())

    // parsing req.body to json
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Hardening our application.
    app.use(helmet())

    // Disabling 304
    app.disable('etag')

    app.use(express.static(__dirname, { dotfiles: 'allow' }))

    // We don't die. :3. All request matters
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.setTimeout(config.apiMaxTimeoutMS, () =>
            res.internalError(
                new Error(
                    'Server timeout error: CONTROLLER took too long to execute'
                )
            )
        )
        next()
    })
}
export default configureExpress
