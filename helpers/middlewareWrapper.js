'use strict'

const logger = require('./logger.js')

const { RESPONSE_TIMEOUT } = require('./config.js')
const { ServiceError } = require('./error.js')
const { HTTP_STATUS_GATEWAY_TIMEOUT, GATEWAY_TIMEOUT_ERROR_MESSAGE } = require('./constants.js')

const logResponseAlreadySent = lateResponsePayload => {
  logger.warn('Response timed out. Payload not sent:', lateResponsePayload)
}

module.exports = controller => {
  return async (req, res, next) => {
    try {
      res.setTimeout(
        Number(RESPONSE_TIMEOUT),
        () => (
          next(new ServiceError(HTTP_STATUS_GATEWAY_TIMEOUT, GATEWAY_TIMEOUT_ERROR_MESSAGE))
        )
      )

      const result = await controller(req)

      if (res.headersSent) {
        logResponseAlreadySent(result)

        return
      }

      res.status(200).json(result)
    } catch (err) {
      logger.error('', err)

      if (res.headersSent) {
        logResponseAlreadySent(err)

        return
      }

      next(err)
    }
  }
}
