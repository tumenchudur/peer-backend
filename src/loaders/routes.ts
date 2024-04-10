import { Express, NextFunction, Request, Response } from 'express'
import Routes from '@root/api/routes'
import config from '@root/config'
import { isCelebrateError } from 'celebrate'
import logger from './logger'

function configureRoutes(app: Express): void {
    app.get(`/status`, (req: Request, res: Response) => {
        res.send('API is working!')
    })
    app.head(`/status`, (req: Request, res: Response) => {
        res.send('API is working!')
    })

    // API routes
    app.use(`${config.api.prefix}`, Routes)

    // Default response if no routes match
    app.all('*', (_req: Request, res: Response) => res.routeNotFound())

    // Catch all unhandled exceptions
    app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
        if (isCelebrateError(err)) {
            err.details.forEach((e) => {
                err.message += `. ${e.message}`
            })

            res.badRequest(err)
        }

        if (typeof err.message === 'object') {
            err.message = JSON.stringify(err.message)
        }

        // This is end of life. it should never reach here.
        logger.error(`FATAL: ${err}`)

        res.internalError(new Error(err.message || 'Internal Server Error'))

        next()
    })
}

export default configureRoutes
