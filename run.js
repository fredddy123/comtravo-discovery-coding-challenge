'use strict'

const logger = require('./helpers/logger.js')
const { APP_PORT } = require('./helpers/config.js')

require('./index.js')()
  .listen(APP_PORT, () => logger.info(`Server started on APP_PORT: ${APP_PORT}`))
