'use strict'

const express = require('express')
const routes = require('./api/routes')

module.exports = () => {
  const app = express()

  routes(app)

  return app
}
