import winston from 'winston'
import { AbstractConfigSet } from 'winston/lib/winston/config'
import { DateHelpers } from '@root/utils'
import config from '@root/config'

const { printf, combine, colorize } = winston.format

const logLevels: AbstractConfigSet = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        sql: 4,
        debug: 5
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'blue',
        sql: 'blue',
        debug: 'gray'
    }
}
winston.addColors(logLevels.colors)

export const jsonFormatter = function jsonFormatter(logEntry: any): any {
    const base = { timestamp: new Date() }
    const json = Object.assign(base, logEntry)
    const today = DateHelpers.now()
    const day = today.toISOString().split('T')[0]
    const hours = today.getUTCHours()
    const minutes = today.getUTCMinutes()
    const message =
        typeof json.message === 'object'
            ? JSON.stringify(json.message)
            : json.message
    logEntry.message = `[${day} ${hours}:${minutes} UTC]: ${message}`
    return logEntry
}

class LoggingService {
    /** Winston Logger */
    private logger: winston.Logger

    public constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL,
            exitOnError: function globalPipe(ex: Error) {
                this.winston.error('error', ex.message, {
                    metadata: 'GLOBAL-PIPE-ERROR'
                })
                return false
            },
            transports: [
                new winston.transports.File({
                    filename: './logs/error.log',
                    level: 'error',
                    maxsize: 52428800, // 50MB
                    maxFiles: 500
                }),
                new winston.transports.File({
                    filename: './logs/combined.log',
                    maxsize: 52428800, // 50MB
                    maxFiles: 500
                })
            ]
        })
        if (config.env === 'development') {
            this.logger.add(
                new winston.transports.Console({
                    format: combine(
                        colorize(),
                        winston.format(jsonFormatter)(),
                        printf((info: any) => `${info.level}: ${info.message}`)
                    )
                })
            )
        }
        this.logger.on('error', (err: Error) => {
            this.logger.error(err.stack, {
                metadata: 'WINSTON-LOGGER-ERROR'
            })
        })
    }

    public getLogger(): winston.Logger {
        return this.logger
    }
}

const Logger = new LoggingService()

function getFileName(message: string): string {
    const STACK_FUNC_NAME = new RegExp(/(\S+):(\d+):(\d+)/)
    const err = new Error()

    Error.captureStackTrace(err)

    const stacks = err.stack.split('\n').slice(1)
    let callerInfo = null
    try {
        const data = stacks[2].split('/')
        callerInfo = STACK_FUNC_NAME.exec(data[data.length - 1])
        const info = {
            filename: callerInfo[1],
            line: callerInfo[2],
            column: callerInfo[3]
        }
        return `${info.filename}(${info.line}:${info.column})`
    } catch {
        return message
    }
}

const logger: {
    error: any
    debug: any
    info: any
} = {
    error: function error(...args: any[]): void {
        const callerInfo = getFileName('ERROR-LOG-FUNCTION')
        const metadata = { metadata: args[1] || callerInfo }
        if (args[0] instanceof Error) {
            let logMessage = ''
            if (typeof args[0].message !== 'string') {
                logMessage = JSON.stringify(args[0].message)
            }
            logMessage += ` ${args[0].stack
                .split('\n')
                .map((line: any) => {
                    if (
                        line.indexOf('node_modules') === -1 &&
                        line.indexOf('at Generator.next (<anonymous>)') ===
                            -1 &&
                        line.indexOf('internal/') === -1
                    ) {
                        return line
                    }
                    return null
                })
                .filter((val) => val !== null)
                .join('\n')}`
            Logger.getLogger().error(logMessage, metadata)
            return
        }
        Logger.getLogger().error(args[0], metadata)
    },
    debug: function debug(...args: string[]): void {
        const callerInfo = getFileName('DEBUG-LOG-FUNCTION')
        const metadata = { metadata: args[1] || callerInfo }
        Logger.getLogger().debug(args[0], metadata)
    },
    info: function info(...args: string[]): void {
        const callerInfo = getFileName('INFO-LOG-FUNCTION')
        const metadata = { metadata: args[1] || callerInfo }
        Logger.getLogger().info(args[0], metadata)
    }
}

process.on('uncaughtException', (err): void => {
    logger.error(err)
})

process.on('unhandledRejection', (ex: Error): void => {
    throw ex
})

process.on('SIGINT', () => process.exit())

export default logger
