import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RoomsList from './RoomsList'
import Timelines from './Timelines'

const mapStateToProps = state => ({
  offsetX: state.gui.positionLeftHoursline
})

class Meetings extends Component {
  static propTypes = {
    data: PropTypes.object,
    offsetX: PropTypes.number
  }

  componentDidMount () {
    const { offsetX } = this.props
    console.log('Запустили прокруточку', offsetX)
    this.meetingElem.scrollTo(-offsetX, 0)
  }

  render () {
    const {data: {sortedRooms, arrengedEvents}} = this.props

    return (
      <div className='meetings' ref={elem => { this.meetingElem = elem }}>
        <RoomsList rooms={sortedRooms} />
        <Timelines rooms={sortedRooms} arrengedEvents={arrengedEvents} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Meetings)
