'use strict'

const discovery = require('../services/discovery/service.js')

const controllers = {
  async getFlights () {
    const flights = await discovery.getFlights()

    return flights
  }
}

module.exports = controllers
