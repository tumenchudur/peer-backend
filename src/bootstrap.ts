import express, { Application } from 'express'
import '@root/loaders/logger'
import '@root/loaders/db'
import '@root/utils/responseHelpers'
import { configureEnvironment } from '@root/config'

import configureServer from '@root/loaders/express'
import configureRoutes from '@root/loaders/routes'

async function load(): Promise<Application> {
    configureEnvironment()

    const app = express()

    configureServer(app)
    configureRoutes(app)

    // TODO : cronjob & subscribers?
    // enableSubscribers()
    // enableCronJobs()

    return app
}

export default load()
