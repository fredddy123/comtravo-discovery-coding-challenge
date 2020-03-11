'use strict'

const path = require('path')
const Ajv = require('ajv')
const dotenv = require('dotenv')

const { TEST_ENV_NAME } = require('./constants.js')

dotenv.config({
  ...(process.env.NODE_ENV === TEST_ENV_NAME ? { path: path.resolve(__dirname, '../.test.env') } : {})
})

const validateConfig = (new Ajv()).compile({
  type: 'object',
  required: [
    'NODE_ENV',
    'SERVICE_NAME',
    'APP_PORT',
    'LOG_LEVEL',
    'ERROR_LOGS_FILE',
    'COMBINED_LOGS_FILE',
    'DISCOVERY_BASE_URL',
    'DISCOVERY_AUTH_USERNAME',
    'DISCOVERY_AUTH_PASSWORD',
    'DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS',
    'RESPONSE_TIMEOUT'
  ],
  properties: {
    NODE_ENV: { enum: ['test', 'dev', 'stage', 'prod'] },
    SERVICE_NAME: { type: 'string' },
    APP_PORT: { type: 'number' },
    LOG_LEVEL: { type: 'string' },
    ERROR_LOGS_FILE: { type: 'string' },
    COMBINED_LOGS_FILE: { type: 'string' },
    DISCOVERY_BASE_URL: { type: 'string' },
    DISCOVERY_AUTH_USERNAME: { type: 'string' },
    DISCOVERY_AUTH_PASSWORD: { type: 'string' },
    DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS: {
      type: 'array',
      items: { type: 'string' }
    },
    RESPONSE_TIMEOUT: { type: 'number' }
  }
})

const {
  NODE_ENV,
  SERVICE_NAME,
  APP_PORT,
  LOG_LEVEL,
  ERROR_LOGS_FILE,
  COMBINED_LOGS_FILE,
  DISCOVERY_BASE_URL,
  DISCOVERY_AUTH_USERNAME,
  DISCOVERY_AUTH_PASSWORD,
  DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS,
  RESPONSE_TIMEOUT
} = process.env

const config = {
  NODE_ENV,
  SERVICE_NAME,
  APP_PORT: Number(APP_PORT),
  LOG_LEVEL,
  ERROR_LOGS_FILE,
  COMBINED_LOGS_FILE,
  DISCOVERY_BASE_URL,
  DISCOVERY_AUTH_USERNAME,
  DISCOVERY_AUTH_PASSWORD,
  DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS: JSON.parse(DISCOVERY_FLIGHTS_SOURCES_ENDPOINTS_PATHS),
  RESPONSE_TIMEOUT: Number(RESPONSE_TIMEOUT)
}

if (!validateConfig(config)) {
  console.log('Config is not valid. Errors:', validateConfig.errors)

  process.exit(1)
}

module.exports = config
