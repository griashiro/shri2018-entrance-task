import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Handler from './Handler'

import sortRoomsByFloorAndName from '../utils/sortRoomsByFloorAndName'
import arrangeEventsByDateAndFloor from '../utils/arrangeEventsByDateAndFloor'
import arrangeById from '../utils/arrangeById'

class Arranger extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  checkData (data) {
    const { events, rooms, users } = data

    const isArray = Array.isArray
    if (events && rooms && users) {
      if (isArray(events) && isArray(rooms) && isArray(users)) {
        return
      }
    }

    throw Error('С сервера пришли некорректные данные')
  }

  arrangeData (data) {
    data.eventsById = arrangeById(data.events)
    data.roomsById = arrangeById(data.rooms)
    data.usersById = arrangeById(data.users)
    data.sortedRooms = sortRoomsByFloorAndName(data.rooms, true)
    data.arrengedEvents = arrangeEventsByDateAndFloor(data.events)

    console.log('Организовываем данные', data)

    return data
  }

  render () {
    const { data } = this.props

    if (Object.keys(data).length === 0) {
      return null
    }

    this.checkData(data)

    return <Handler data={this.arrangeData(data)} />
  }
}

export default Arranger
