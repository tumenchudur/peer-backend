import bluebird from 'bluebird'
import mongoose, { Connection, ConnectOptions } from 'mongoose'
import config from '@root/config'
import logger from '@root/loaders/logger'

declare module 'mongoose' {
    export let primary: Connection
}

try {
    const options: ConnectOptions = {
        autoIndex: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    }

    mongoose.Promise = bluebird

    mongoose.primary = mongoose.createConnection(
        config.mongoDB.primaryURI,
        options
    )

    // TODO: zoloog fix it
    mongoose.set('debug', true)

    // Log database statuses
    mongoose.primary.on('connected', () =>
        logger.info(
            `Database connection to [${
                (mongoose.primary.db && mongoose.primary.db.databaseName) ||
                'null'
            }]: SUCCESSFUL`
        )
    )
    mongoose.primary.on('disconnected', () =>
        logger.info(
            `Database connection to [${
                (mongoose.primary.db && mongoose.primary.db.databaseName) ||
                'null'
            }]: DISCONNECTED`
        )
    )
    mongoose.primary.on('reconnected', () =>
        logger.info(
            `Database connection to [${
                (mongoose.primary.db && mongoose.primary.db.databaseName) ||
                'null'
            }]: RECONNECTED`
        )
    )
    mongoose.primary.on('error', (error: Error): void => {
        logger.error(`Error: ${error.message}`)
    })
} catch (err) {
    logger.error(err.message || err.stack || err)
}

export default {}
