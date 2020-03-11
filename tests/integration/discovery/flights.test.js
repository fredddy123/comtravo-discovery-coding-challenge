'use strict'

const request = require('supertest')
const nock = require('nock')

const createApp = require('../../../index.js')

const { HTTP_STATUS_GATEWAY_TIMEOUT, GATEWAY_TIMEOUT_ERROR_MESSAGE } = require('../../../helpers/constants.js')

const firstSourceAnswer = require('./fixtures/firstSourceAnswer.json')
const secondSourceAnswer = require('./fixtures/secondSourceAnswer.json')
const expectedResponse = require('./fixtures/expectedResponse.json')

const config = require('../../../helpers/config')

const [
  discoveryFlightsSourceEndpointPath1,
  discoveryFlightsSourceEndpointPath2
] = config.DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS

const app = createApp()

describe('GET /flights endpoint', () => {
  describe('when called', () => {
    describe('and when request handling took less than 1 second', () => {
      beforeAll(() => {
        nock(config.DISCOVERY_BASE_URL)
          .get(discoveryFlightsSourceEndpointPath1)
          .basicAuth({
            user: config.DISCOVERY_AUTH_USERNAME,
            pass: config.DISCOVERY_AUTH_PASSWORD
          })
          .reply(200, {
            flights: firstSourceAnswer
          })

        nock(config.DISCOVERY_BASE_URL)
          .get(discoveryFlightsSourceEndpointPath2)
          .basicAuth({
            user: config.DISCOVERY_AUTH_USERNAME,
            pass: config.DISCOVERY_AUTH_PASSWORD
          })
          .reply(200, {
            flights: secondSourceAnswer
          })
      })

      it('should successfully respond with the correct data', async () => {
        await request(app)
          .get('/flights')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, expectedResponse)
      })
    })

    describe('and when request handling took more than 1 second', () => {
      beforeAll(() => {
        nock(config.DISCOVERY_BASE_URL)
          .get(discoveryFlightsSourceEndpointPath1)
          .basicAuth({
            user: config.DISCOVERY_AUTH_USERNAME,
            pass: config.DISCOVERY_AUTH_PASSWORD
          })
          .delay(1001)
          .reply(200, {
            flights: firstSourceAnswer
          })

        nock(config.DISCOVERY_BASE_URL)
          .get(discoveryFlightsSourceEndpointPath2)
          .basicAuth({
            user: config.DISCOVERY_AUTH_USERNAME,
            pass: config.DISCOVERY_AUTH_PASSWORD
          })
          .reply(200, {
            flights: secondSourceAnswer
          })
      })

      it('should fail with appropriate status and message', async () => {
        await request(app)
          .get('/flights')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(504, {
            status: 'error',
            statusCode: HTTP_STATUS_GATEWAY_TIMEOUT,
            message: GATEWAY_TIMEOUT_ERROR_MESSAGE
          })
      })
    })
  })
})
