'use strict'
/* eslint-env jest */

const { mergeFlightsLists } = require('../../../../../services/discovery/utils.js')

describe('Util mergeFlightsLists', () => {
  describe('when list with 2 flights lists passed', () => {
    describe('and when there are only unique tickets in both lists', () => {
      describe('and when all flights are unique', () => {
        it('should return simply concated flights lists', () => {
          const list1Ticket1 = {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2',
                arrival_date_time_utc: '3'
              },
              {
                flight_number: '4',
                departure_date_time_utc: '5',
                arrival_date_time_utc: '6'
              }
            ]
          }

          const list2Ticket1 = {
            slices: [
              {
                flight_number: '11',
                departure_date_time_utc: '22',
                arrival_date_time_utc: '33'
              },
              {
                flight_number: '44',
                departure_date_time_utc: '55',
                arrival_date_time_utc: '66'
              }
            ]
          }

          const list1 = [
            list1Ticket1
          ]

          const list2 = [
            list2Ticket1
          ]

          const result = mergeFlightsLists([list1, list2])

          expect(result).toEqual([
            list1Ticket1,
            list2Ticket1
          ])
        })
      })

      describe('and when 1 flight matches', () => {
        it('should return simply concated flights lists', () => {
          const list1Ticket1 = {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2',
                arrival_date_time_utc: '3'
              },
              {
                flight_number: '4',
                departure_date_time_utc: '5',
                arrival_date_time_utc: '6'
              }
            ]
          }

          const list2Ticket1 = {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2',
                arrival_date_time_utc: '3'
              },
              {
                flight_number: '44',
                departure_date_time_utc: '55',
                arrival_date_time_utc: '66'
              }
            ]
          }

          const list1 = [
            list1Ticket1
          ]

          const list2 = [
            list2Ticket1
          ]

          const result = mergeFlightsLists([list1, list2])

          expect(result).toEqual([
            list1Ticket1,
            list2Ticket1
          ])
        })
      })
    })

    describe('and when 1 ticket matches', () => {
      describe('and when there is only one ticket in each flights list', () => {
        it('should return a list containing only that one ticket', () => {
          const list1Ticket1 = {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2',
                arrival_date_time_utc: '3'
              },
              {
                flight_number: '4',
                departure_date_time_utc: '5',
                arrival_date_time_utc: '6'
              }
            ]
          }

          const list2Ticket1 = {
            slices: [
              {
                flight_number: '1',
                departure_date_time_utc: '2',
                arrival_date_time_utc: '3'
              },
              {
                flight_number: '4',
                departure_date_time_utc: '5',
                arrival_date_time_utc: '6'
              }
            ]
          }

          const list1 = [
            list1Ticket1
          ]

          const list2 = [
            list2Ticket1
          ]

          const result = mergeFlightsLists([list1, list2])

          expect(result).toEqual([
            list1Ticket1
          ])
        })
      })

      describe('and when there are multiple tickets in each flights list', () => {
        it('should return concated lists but without the duplicate', () => {
          const list1Ticket1 = {
            slices: [
              {
                flight_number: 'list1Ticket1_slice_1_1_flight_number',
                departure_date_time_utc: 'list1Ticket1_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket1_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list1Ticket1_slice_1_2_flight_number',
                departure_date_time_utc: 'list1Ticket1_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket1_slice_1_2_arrival_date_time_utc'
              }
            ]
          }

          const list12Ticket22 = {
            slices: [
              {
                flight_number: 'list[1,2]_ticket2_slice_1_1_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket2_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list[1,2]_ticket2_slice_1_2_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket2_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_2_arrival_date_time_utc'
              },
              {
                flight_number: 'list[1,2]_ticket2_slice_1_3_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket2_slice_1_3_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_3_arrival_date_time_utc'
              }
            ]
          }

          const list1Ticket3 = {
            slices: [
              {
                flight_number: 'list1Ticket3_slice_1_1_flight_number',
                departure_date_time_utc: 'list1Ticket3_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket3_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list1Ticket3_slice_1_2_flight_number',
                departure_date_time_utc: 'list1Ticket3_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket3_slice_1_2_arrival_date_time_utc'
              }
            ]
          }

          const list2Ticket1 = {
            slices: [
              {
                flight_number: 'list2Ticket1_slice_1_1_flight_number',
                departure_date_time_utc: 'list2Ticket1_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list2Ticket1_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list2Ticket1_slice_1_2_flight_number',
                departure_date_time_utc: 'list2Ticket1_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list2Ticket1_slice_1_2_arrival_date_time_utc'
              }
            ]
          }

          const list1 = [
            list1Ticket1,
            list12Ticket22,
            list1Ticket3
          ]

          const list2 = [
            list2Ticket1,
            list12Ticket22
          ]

          const result = mergeFlightsLists([list1, list2])

          expect(result).toEqual([
            list1Ticket1,
            list12Ticket22,
            list1Ticket3,
            list2Ticket1
          ])
        })
      })
    })

    describe('and when 2 tickets match', () => {
      describe('and when there are multiple tickets in each flights list', () => {
        it('should return concated lists but without the duplicate', () => {
          const list1Ticket1 = {
            slices: [
              {
                flight_number: 'list1Ticket1_slice_1_1_flight_number',
                departure_date_time_utc: 'list1Ticket1_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket1_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list1Ticket1_slice_1_2_flight_number',
                departure_date_time_utc: 'list1Ticket1_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket1_slice_1_2_arrival_date_time_utc'
              }
            ]
          }

          const list12Ticket22 = {
            slices: [
              {
                flight_number: 'list[1,2]_ticket2_slice_1_1_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket2_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list[1,2]_ticket2_slice_1_2_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket2_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_2_arrival_date_time_utc'
              },
              {
                flight_number: 'list[1,2]_ticket2_slice_1_3_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket2_slice_1_3_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_3_arrival_date_time_utc'
              }
            ]
          }

          const list1Ticket3 = {
            slices: [
              {
                flight_number: 'list1Ticket3_slice_1_1_flight_number',
                departure_date_time_utc: 'list1Ticket3_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket3_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list1Ticket3_slice_1_2_flight_number',
                departure_date_time_utc: 'list1Ticket3_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list1Ticket3_slice_1_2_arrival_date_time_utc'
              }
            ]
          }

          const list12Ticket43 = {
            slices: [
              {
                flight_number: 'list[1,2]_ticket[4,3]_slice_1_1_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket[4,3]_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket[4,3]_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list[1,2]_ticket[4,3]_slice_1_2_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket[4,3]_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket[4,3]_slice_1_2_arrival_date_time_utc'
              },
              {
                flight_number: 'list[1,2]_ticket[4,3]_slice_1_3_flight_number',
                departure_date_time_utc: 'list[1,2]_ticket[4,3]_slice_1_3_departure_date_time_utc',
                arrival_date_time_utc: 'list[1,2]_ticket[4,3]_slice_1_3_arrival_date_time_utc'
              }
            ]
          }

          const list2Ticket1 = {
            slices: [
              {
                flight_number: 'list2Ticket1_slice_1_1_flight_number',
                departure_date_time_utc: 'list2Ticket1_slice_1_1_departure_date_time_utc',
                arrival_date_time_utc: 'list2Ticket1_slice_1_1_arrival_date_time_utc'
              },
              {
                flight_number: 'list2Ticket1_slice_1_2_flight_number',
                departure_date_time_utc: 'list2Ticket1_slice_1_2_departure_date_time_utc',
                arrival_date_time_utc: 'list2Ticket1_slice_1_2_arrival_date_time_utc'
              }
            ]
          }

          const list1 = [
            list1Ticket1,
            list12Ticket22,
            list1Ticket3,
            list12Ticket43
          ]

          const list2 = [
            list2Ticket1,
            list12Ticket22,
            list12Ticket43
          ]

          const result = mergeFlightsLists([list1, list2])

          expect(result).toEqual([
            list1Ticket1,
            list12Ticket22,
            list1Ticket3,
            list12Ticket43,
            list2Ticket1
          ])
        })
      })
    })
  })

  describe('when list with 3 flights lists passed', () => {
    describe('and when 1 ticket matches in all 3 flights lists', () => {
      it('should return concated lists but without the duplicate', () => {
        const list1Ticket1 = {
          slices: [
            {
              flight_number: 'list1Ticket1_slice_1_1_flight_number',
              departure_date_time_utc: 'list1Ticket1_slice_1_1_departure_date_time_utc',
              arrival_date_time_utc: 'list1Ticket1_slice_1_1_arrival_date_time_utc'
            },
            {
              flight_number: 'list1Ticket1_slice_1_2_flight_number',
              departure_date_time_utc: 'list1Ticket1_slice_1_2_departure_date_time_utc',
              arrival_date_time_utc: 'list1Ticket1_slice_1_2_arrival_date_time_utc'
            }
          ]
        }

        const list123Ticket221 = {
          slices: [
            {
              flight_number: 'list[1,2]_ticket2_slice_1_1_flight_number',
              departure_date_time_utc: 'list[1,2]_ticket2_slice_1_1_departure_date_time_utc',
              arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_1_arrival_date_time_utc'
            },
            {
              flight_number: 'list[1,2]_ticket2_slice_1_2_flight_number',
              departure_date_time_utc: 'list[1,2]_ticket2_slice_1_2_departure_date_time_utc',
              arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_2_arrival_date_time_utc'
            },
            {
              flight_number: 'list[1,2]_ticket2_slice_1_3_flight_number',
              departure_date_time_utc: 'list[1,2]_ticket2_slice_1_3_departure_date_time_utc',
              arrival_date_time_utc: 'list[1,2]_ticket2_slice_1_3_arrival_date_time_utc'
            }
          ]
        }

        const list1Ticket3 = {
          slices: [
            {
              flight_number: 'list1Ticket3_slice_1_1_flight_number',
              departure_date_time_utc: 'list1Ticket3_slice_1_1_departure_date_time_utc',
              arrival_date_time_utc: 'list1Ticket3_slice_1_1_arrival_date_time_utc'
            },
            {
              flight_number: 'list1Ticket3_slice_1_2_flight_number',
              departure_date_time_utc: 'list1Ticket3_slice_1_2_departure_date_time_utc',
              arrival_date_time_utc: 'list1Ticket3_slice_1_2_arrival_date_time_utc'
            }
          ]
        }

        const list2Ticket1 = {
          slices: [
            {
              flight_number: 'list2Ticket1_slice_1_1_flight_number',
              departure_date_time_utc: 'list2Ticket1_slice_1_1_departure_date_time_utc',
              arrival_date_time_utc: 'list2Ticket1_slice_1_1_arrival_date_time_utc'
            },
            {
              flight_number: 'list2Ticket1_slice_1_2_flight_number',
              departure_date_time_utc: 'list2Ticket1_slice_1_2_departure_date_time_utc',
              arrival_date_time_utc: 'list2Ticket1_slice_1_2_arrival_date_time_utc'
            }
          ]
        }

        const list3Ticket2 = {
          slices: [
            {
              flight_number: 'list3Ticket2_slice_1_1_flight_number',
              departure_date_time_utc: 'list3Ticket2_slice_1_1_departure_date_time_utc',
              arrival_date_time_utc: 'list3Ticket2_slice_1_1_arrival_date_time_utc'
            },
            {
              flight_number: 'list3Ticket2_slice_1_2_flight_number',
              departure_date_time_utc: 'list3Ticket2_slice_1_2_departure_date_time_utc',
              arrival_date_time_utc: 'list3Ticket2_slice_1_2_arrival_date_time_utc'
            }
          ]
        }

        const list1 = [
          list1Ticket1,
          list123Ticket221,
          list1Ticket3
        ]

        const list2 = [
          list2Ticket1,
          list123Ticket221
        ]

        const list3 = [
          list123Ticket221,
          list3Ticket2
        ]

        const result = mergeFlightsLists([list1, list2, list3])

        expect(result).toEqual([
          list1Ticket1,
          list123Ticket221,
          list1Ticket3,
          list2Ticket1,
          list3Ticket2
        ])
      })
    })
  })
})
