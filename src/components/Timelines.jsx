import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import isDatesEqual from '../utils/isDatesEqual'

import Cloud from './Cloud'

const mapStateToProps = state => ({
  currentDate: state.datetime.currentDate,
  currentTime: state.datetime.currentTime,
  selectedEventId: state.select.selectedEventId
})

class Timelines extends Component {
  static propTypes = {
    rooms: PropTypes.array,
    arrengedEvents: PropTypes.object,
    currentDate: PropTypes.object,
    currentTime: PropTypes.object,
    selectedEventId: PropTypes.string
  }

  constructor () {
    super()
    this.numOfContainers = 34
  }

  renderHalfHours (roomId) {
    const map = this.getMapNumOfContainerToEvent(roomId)

    const timestart = new Date(this.props.currentDate)
    timestart.setHours(7, 30, 0, 0)

    let cloudAlreadyShown = false
    let shouldShowCloud = false

    const halfHours = []

    for (let i = 0; i < this.numOfContainers; ++i) {
      let className = 'timelines__half-hour'
      className += (this.isDisabled(i) ? ' timelines_disabled' : '')

      const dataset = {}

      dataset['data-timestart'] = new Date(timestart)
      dataset['data-roomid'] = roomId
      timestart.setMinutes(timestart.getMinutes() + 30)

      if (map.has(i)) {
        className += ' timelines_busy'
        dataset['data-eventid'] = map.get(i)

        if (String(map.get(i)) === String(this.props.selectedEventId)) {
          className += ' timelines_selected'

          if (!cloudAlreadyShown) {
            cloudAlreadyShown = true
            shouldShowCloud = true
          }
        }
      }

      halfHours.push(<div className={className} {...dataset} key={i}>
        {(i + 1) % 2 === 0 ? <div className='vline' /> : null}
        {shouldShowCloud ? <Cloud /> : null}
      </div>)

      shouldShowCloud = false
    }
    return halfHours
  }

  getMapNumOfContainerToEvent (roomId) {
    const currentDate = new Date(this.props.currentDate)
    currentDate.setHours(0, 0, 0, 0)

    const eventIdByTime = this.props.arrengedEvents[currentDate] &&
      this.props.arrengedEvents[currentDate][roomId]

    const map = new Map()

    if (eventIdByTime) {
      for (const meetingTime of Object.keys(eventIdByTime)) {
        const date = new Date(meetingTime)
        const containerNum = this.mapTimeToContainerNumber(date.getHours(),
          date.getMinutes())
        map.set(containerNum, eventIdByTime[meetingTime])
      }
    }

    return map
  }

  mapTimeToContainerNumber (hours, minutes) {
    const startHour = 8
    const thirtyMinutes = 30

    return (1 + 2 * (hours - startHour) + Math.floor(minutes / thirtyMinutes))
  }

  isDisabled (containerNumber) {
    if (containerNumber === 0 || containerNumber === this.numOfContainers - 1) {
      return true
    }

    const now = new Date()

    if (this.isCurrentDateLessToday()) {
      return true
    } else if (isDatesEqual(now, this.props.currentDate)) {
      return containerNumber < 1 + this.mapTimeToContainerNumber(now.getHours(),
        now.getMinutes())
    } else {
      return false
    }
  }

  isCurrentDateLessToday () {
    const today = new Date()
    const currentDate = new Date(this.props.currentDate)
    today.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)

    return currentDate < today
  }

  render () {
    const {rooms} = this.props
    return (
      <div className='timelines'>
        {rooms.map((floor, floorIndex) => {
          return floor.map((room, index) => {
            const extraClasses = (index === 0 ? ' timelines_floor-margin vline_floor-margin' : '')
            return (
              <div className={'timelines__line-box' + extraClasses}
                key={floorIndex + index}>
                <div className='timelines__line'
                  data-roomid={room.id}>
                  {this.renderHalfHours(room.id)}
                </div>
              </div>
            )
          })
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Timelines)
