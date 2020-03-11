'use strict'

const wrap = require('../helpers/middlewareWrapper.js')
const { handleError } = require('../helpers/error.js')

const controller = require('./controller.js')

module.exports = app => {
  app.route('/flights')
    .get(wrap(controller.getFlights))

  app.use((err, req, res, next) => handleError(err, res))
}
