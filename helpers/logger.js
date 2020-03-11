'use strict'

const winston = require('winston')

const {
  SERVICE_NAME,
  LOG_LEVEL,
  ERROR_LOGS_FILE,
  COMBINED_LOGS_FILE,
  NODE_ENV
} = require('./config.js')

const {
  PROD_ENV_NAME,
  TEST_ENV_NAME,
  LOG_LEVEL_ERROR_NAME
} = require('./constants.js')

const winstonTransports = []

if (NODE_ENV !== TEST_ENV_NAME) {
  winstonTransports.push(
    new winston.transports.File({ filename: ERROR_LOGS_FILE, level: LOG_LEVEL_ERROR_NAME }),
    new winston.transports.File({ filename: COMBINED_LOGS_FILE })
  )
}

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.json(),
  defaultMeta: { service: SERVICE_NAME },
  transports: winstonTransports
})

if (NODE_ENV !== PROD_ENV_NAME) {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple()
    )
  }))
}

module.exports = logger
