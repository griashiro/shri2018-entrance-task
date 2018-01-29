import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import DateBlock from './DateBlock'
import HoursLine from './HoursLine'
import Meetings from './Meetings'
import Form from './Form'
import Dialog from './Dialog'

class MeetingRooms extends Component {
  static propTypes = {
    data: PropTypes.object,
    handlers: PropTypes.object,
    containerRef: PropTypes.func
  }

  render () {
    const { data, handlers, containerRef } = this.props

    return (
      <div {...handlers}
        ref={containerRef}>
        <Header />
        <DateBlock />
        <HoursLine />
        <Meetings data={data} />
        <Form />
        <Dialog />
      </div>
    )
  }
}

export default MeetingRooms
