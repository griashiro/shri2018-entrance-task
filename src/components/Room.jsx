import React from 'react'
import PropTypes from 'prop-types'

import Cross from './Cross'

const Room = ({ start, end, room, floor, selected, id }) => (
  <div
    className={'inputs__one-room inputs_style animated flipInX' + (selected ? ' inputs_one-room-selected' : '')}
    data-roomid={id}>
    <span className='inputs__room-time'>{`${start} - ${end}`}</span>
    <span className='inputs__room-name-and-floor'>{`${room} · ${floor} этаж`}</span>
    <span className='inputs__remove-room-icon'>
      <Cross />
    </span>
  </div>
)

Room.prototype.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  room: PropTypes.string,
  floor: PropTypes.number,
  selected: PropTypes.bool,
  id: PropTypes.string
}

export default Room
