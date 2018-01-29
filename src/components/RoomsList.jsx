import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import declOfNum from '../utils/declOfNum'

const mapStateToProps = state => ({
  isScroll: state.gui.isScroll,
  selectedRoomId: state.select.selectedRoomId,
  data: state.api.data,
  currentDate: state.datetime.currentDate
})

class RoomsList extends Component {
  static propTypes = {
    rooms: PropTypes.array,
    isScroll: PropTypes.bool,
    selectedRoomId: PropTypes.any,
    data: PropTypes.object,
    currentDate: PropTypes.object
  }

  isСompletelyFull (roomId) {
    const { data: {arrengedEvents}, currentDate } = this.props
    const date = new Date(currentDate)
    date.setHours(0, 0, 0, 0)
    const roomsWithMeetingById = arrengedEvents[date]

    if (roomsWithMeetingById && roomsWithMeetingById[roomId]) {
      const rooms = Object.keys(roomsWithMeetingById[roomId])
      if (rooms && rooms.length === 32) {
        return true
      }
    }
  }

  renderFloors (rooms) {
    return rooms.map((floor, index) => {
      const container = []
      container.push(
        <div className='roomslist__floor' key={index}>
          {`этаж ${floor[0].floor}`}
        </div>
      )

      const rooms = floor.map((room) => {
        const { selectedRoomId } = this.props
        let className = 'roomslist__room'
        className += (selectedRoomId === room.id ? ' roomslist_selected' : '')
        className += (this.isСompletelyFull(room.id) ? ' roomslist_full' : '')
        return <div className={className} key={index + room.id}>
          <div className='roomslist__name'>{room.title}</div>
          <div className='roomslist__capacity'>
            {
              `${room.capacity} ` +
              `${declOfNum(room.capacity, ['человек', 'человека', 'человек'])}`
            }
          </div>
        </div>
      })

      return container.concat(rooms)
    })
  }

  render () {
    const { rooms, isScroll } = this.props
    return (
      <div className={'roomslist' + (isScroll ? ' roomslist_scrolled' : '')}>
        {this.renderFloors(rooms)}
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(RoomsList)
