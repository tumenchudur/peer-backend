import logger from '@root/loaders/logger'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
    env: process.env.NODE_ENV,

    host: process.env.NODE_HOST,

    frontendHost: process.env.FRONTEND_HOST,
    /**
     * Server port
     */
    port: parseInt(process.env.NODE_PORT, 10) || 3000,

    /**
     * Maximum time for the controller to execute
     */
    apiMaxTimeoutMS: parseInt(process.env.API_MAX_TIMEOUT_MS, 10) || 100000,

    /**
     * Winston log level
     */
    logs: {
        morgan: ':remote-addr - :remote-user [:date[clf]] ":method :url :auth_token HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
    },

    /**
     * API configs
     */
    api: {
        url: process.env.API_URL,
        prefix: '/api/v1'
    },

    /**
     * CORS allowed origins by array
     */
    corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS.split(',') || [
        process.env.NODE_HOST
    ],

    mongoDB: {
        primaryURI:
            process.env.NODE_ENV === 'development'
                ? process.env.MONGODB_DEV_URI
                : process.env.MONGODB_PROD_URI
    },

    crypto: {
        hash_iv: process.env.CRYPTO_HASH_IV,
        hash_key: process.env.CRYPTO_HASH_KEY
    },

    jwt: {
        secret: process.env.JWT_SECRET
    },




}

export function configureEnvironment(): void {
    if (!config.mongoDB.primaryURI) {
        logger.error(
            'No mongo connection string. Set MONGODB_DEV_URI/MONGODB_PROD_URI environment variable.'
        )
        process.exit(1)
    }
}

export default config
