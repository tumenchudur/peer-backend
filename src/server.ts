import 'module-alias/register'
import '@root/loaders/env'
import bootstrapLoad from '@root/bootstrap'
import config from '@root/config'
import logger from '@root/loaders/logger'

/**
 * Start Express server.
 */
const { env, port } = config

const server = bootstrapLoad.then((app) => {
    app.listen(port, '0.0.0.0', async () => {
        logger.info(`Listening on port ${port} in ${env} mode...`)
    })
})

export default server
