'use strict'

const Ajv = require('ajv')

const validateDiscoveryResponse = (new Ajv()).compile({
  type: 'object',
  properties: {
    flights: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slices: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                origin_name: {
                  type: 'string'
                },
                destination_name: {
                  type: 'string'
                },
                departure_date_time_utc: {
                  type: 'string'
                },
                arrival_date_time_utc: {
                  type: 'string'
                },
                flight_number: {
                  type: 'string'
                },
                duration: {
                  type: 'number'
                }
              }
            }
          },
          price: {
            type: 'number'
          }
        }
      }
    }
  }
})

const createTicketIdentifierString = ticket => {
  return ticket.slices.reduce((id, slice) => (
        `${id}-${slice.flight_number}-${slice.departure_date_time_utc}-${slice.arrival_date_time_utc}`
  ), '')
}

function mergeFlightsLists (listOfTicketsLists) {
  return Object.values(
    listOfTicketsLists
      .reduce((totalList, ticketsList) => ([...totalList, ...ticketsList]), [])
      .reduce((hashTable, ticket) => ({ ...hashTable, [createTicketIdentifierString(ticket)]: ticket }), {})
  )
}

module.exports = {
  mergeFlightsLists,
  validateDiscoveryResponse
}
