import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setHoursLineElem } from '$redux/actions'

import isDatesEqual from '../utils/isDatesEqual'
import createTimeString from '../utils/createTimeString'

const mapStateToProps = state => ({
  currentTime: state.datetime.currentTime,
  positionLeftTime: state.gui.positionLeftTime,
  positionLeftHoursline: state.gui.positionLeftHoursline,
  currentDate: state.datetime.currentDate
})

const mapDispatchToProps = dispatch => ({
  setHoursLineElem: bindActionCreators(setHoursLineElem, dispatch)
})

class HoursLine extends Component {
  static propTypes = {
    currentTime: PropTypes.object,
    positionLeftTime: PropTypes.number,
    positionLeftHoursline: PropTypes.number,
    currentDate: PropTypes.object,
    setHoursLineElem: PropTypes.func
  }

  constructor () {
    super()
    this.firstHour = 8
  }

  componentDidMount () {
    this.props.setHoursLineElem(this.hoursLine)
  }

  renderHours () {
    const dayEndHour = 24

    const hours = []
    for (let i = this.firstHour; i <= dayEndHour; ++i) {
      hours.push(<div key={i} className='hoursline__one-hour'>
        {i === this.firstHour ? '8:00' : (i === dayEndHour ? '0:00' : i)}
      </div>)
    }

    return hours
  }

  isTimeHidden () {
    const { currentTime, currentDate, positionLeftTime } = this.props
    const hours = currentTime.getHours()
    return positionLeftTime === 0 || hours < this.firstHour ||
      !isDatesEqual(currentDate, new Date())
  }

  render () {
    const { positionLeftTime, positionLeftHoursline, currentTime } = this.props

    return (
      <div className='hoursline'
        style={{ left: positionLeftHoursline + 'px' || 0 }}>
        <div className='hoursline__content'>
          <div className='hoursline__hours' ref={elem => { this.hoursLine = elem }}>
            <div className={'hoursline__current' + (this.isTimeHidden() ? ' hidden' : '')}
              style={{ left: positionLeftTime + 'px' || 0 }}>
              <span className='hoursline__now'>{createTimeString(currentTime)}</span>
              <div className='hoursline__line' />
            </div>
            {this.renderHours()}
            <div className='hoursline__one-hour' />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursLine)
