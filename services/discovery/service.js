'use strict'

const axios = require('axios')

const constants = require('../../helpers/constants.js')
const logger = require('../../helpers/logger.js')
const config = require('../../helpers/config.js')
const { mergeFlightsLists, validateDiscoveryResponse } = require('./utils.js')
const { ServiceError } = require('../../helpers/error')

const sourcesEndpointsPaths = config.DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS

const request = axios.create({
  baseURL: config.DISCOVERY_BASE_URL,
  auth: {
    username: config.DISCOVERY_AUTH_USERNAME,
    password: config.DISCOVERY_AUTH_PASSWORD
  }
})

module.exports = {
  async getFlights () {
    let listWithRawResponses

    try {
      listWithRawResponses = await Promise.all(sourcesEndpointsPaths.map(request.get))
    } catch (err) {
      logger.error(err.message)
      logger.debug(constants.EXTERNAL_SERVICE_UNAVAILABLE_MESSAGE, err)
      throw new ServiceError(
        constants.HTTP_STATUS_SERVICE_UNAVAILABLE,
        constants.EXTERNAL_SERVICE_UNAVAILABLE_MESSAGE
      )
    }

    const listWithResponses = listWithRawResponses.map(data => data.data)
    logger.debug('listWithResponses', { listWithResponses })

    const validationResults = listWithResponses.map(validateDiscoveryResponse)
    logger.debug('validationResults', { validationResults })

    if (validationResults.some(isValidResponse => !isValidResponse)) {
      throw new ServiceError(
        constants.HTTP_STATUS_SERVICE_UNAVAILABLE,
        constants.EXTERNAL_SERVICE_RESPONSE_NOT_VALID_ERROR_MESSAGE
      )
    }

    const listOfFlightsLists = listWithResponses.map(data => data.flights)
    logger.debug('listOfFlightsLists', { listOfFlightsLists })

    const mergedFlightsList = mergeFlightsLists(listOfFlightsLists)
    logger.debug('mergedFlightsList', { mergedFlightsList })

    return {
      flights: mergedFlightsList
    }
  }
}
