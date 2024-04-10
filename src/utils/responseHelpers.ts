import { response } from 'express'
import { Response } from 'express-serve-static-core'
import logger from '@root/loaders/logger'
import { IPagination } from '@root/interfaces'

declare module 'express-serve-static-core' {
    export interface Request {
        user?: any // HACK,
        pagination?: IPagination;
        sort?: any
    }

    export interface Response {
        respondWithData(data: any, pagination?: any): this
        respondWithError(error: Error, statusCode: number): this
        internalError(error?: Error): this
        documentNotFound(error?: Error): this
        badRequest(error?: Error): this
        resourceForbidden(error?: Error): this
        routeNotFound(error?: Error): this
        notImplemented(error?: Error): this
    }
}

/*
 * Global Response helpers
 * {@status string} ['success', 'error']
 * {@statusCode string} status code
 * {@data any} response data
 * {@error any} error name
 * {@message any} error message
 */
response.internalError = function internalError(
    error = new Error('Серверийн алдаа [Internal Error]')
): Response {
    if (this.headersSent) return this
    logger.error(error)
    return this.status(500).json({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: 500
    })
}
response.respondWithData = function respondWithData(
    data: any = {},
    // eslint-disable-next-line id-blacklist
    pagination: any = undefined
): Response {
    if (this.headersSent) return this
    return this.json({
        data,
        pagination,
        status: 'success',
        statusCode: 0
    })
}

response.respondWithError = function respondWithError(
    error: Error = new Error('Something went wrong'),
    statusCode: number
): Response {
    if (this.headersSent) return this
    return this.json({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: statusCode
    })
}

response.badRequest = function badRequest(
    error: Error = new Error('Алдаатай хүсэлт')
): Response {
    if (this.headersSent) return this
    logger.error(error)
    return this.status(400).json({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: 400
    })
}

response.documentNotFound = function documentNotFound(
    error = new Error('Документ Олдсонгүй [Document not found]')
): Response {
    if (this.headersSent) return this
    logger.error(error)
    return this.status(400).send({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: 400
    })
}

response.resourceForbidden = function resourceForbidden(
    error = new Error('Хориотой бүс [Forbidden]')
): Response {
    if (this.headersSent) return this
    logger.error(error)
    return this.status(403).json({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: 403
    })
}

response.routeNotFound = function routeNotFound(
    error = new Error('Зам олдсонгүй [Route not found]')
): Response {
    if (this.headersSent) return this
    logger.error(error)
    return this.status(404).json({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: 404
    })
}

response.notImplemented = function notImplemented(
    error = new Error('Хараахан хэрэгжүүлээгүй байна [Not implemented]')
): Response {
    if (this.headersSent) return this
    logger.error(error)
    return this.status(200).json({
        error: error.name,
        message: error.message,
        status: 'error',
        statusCode: 501
    })
}
