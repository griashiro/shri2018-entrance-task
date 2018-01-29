import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setDate, showCalendar, hideCalendar } from '$redux/actions'
import { namesGanitive as monthNames } from '../constants/monts'

import Button from './Button'
import Calendar from './Calendar'

const mapStateToProps = state => ({
  currentDate: state.datetime.currentDate,
  isCalendarVisible: state.calendar.isVisible
})

const mapDispatchToProps = dispatch => ({
  setDate: bindActionCreators(setDate, dispatch),
  showCalendar: bindActionCreators(showCalendar, dispatch),
  hideCalendar: bindActionCreators(hideCalendar, dispatch)
})

class DateBlock extends Component {
  static propTypes = {
    currentDate: PropTypes.object,
    isCalendarVisible: PropTypes.bool,
    setDate: PropTypes.func,
    showCalendar: PropTypes.func,
    hideCalendar: PropTypes.func
  }

  isSameYearAndMonth (firstDate, secondDate) {
    return firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
  }

  isToday (currentDate) {
    const now = new Date()
    return now.getDate() === currentDate.getDate() &&
      this.isSameYearAndMonth(now, currentDate)
  }

  isTomorrow (currentDate) {
    const now = new Date()
    return now.getDate() + 1 === currentDate.getDate() &&
      this.isSameYearAndMonth(now, currentDate)
  }

  renderCurrentDate () {
    const {currentDate} = this.props

    let monthName = `${monthNames[currentDate.getMonth()]}`
    monthName = this.isToday(currentDate) ||
      this.isTomorrow(currentDate) ? monthName.slice(0, 3) : monthName

    const currentDateString = `${currentDate.getDate()} ${monthName}`
    const additionalInfo = (this.isToday(currentDate) ? ' · Сегодня' : '') +
      (this.isTomorrow(currentDate) ? ' · Завтра' : '')

    return currentDateString + additionalInfo
  }

  setNextDate (currentDate, setDate) {
    setDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))
  }

  setPreviousDate (currentDate, setDate) {
    setDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))
  }

  toggleCalendarVisibility (isCalendarVisible, showCalendar, hideCalendar) {
    isCalendarVisible ? hideCalendar() : showCalendar()
  }

  onClickHandler = (e) => {
    const target = e && e.target

    if (target) {
      const { className, dataset } = target

      if (typeof className === 'string' && className.includes('calendar__day')) {
        this.props.setDate(new Date(dataset.date))
        e.stopPropagation()
      }
    }
  }

  render () {
    const { currentDate, setDate, isCalendarVisible, showCalendar, hideCalendar } = this.props
    return (
      <div className='date' onClick={this.onClickHandler}>
        <div className='date__content'>
          <Button type='round' icon='arrow' isRotated
            onClick={() => { this.setPreviousDate(currentDate, setDate) }} />
          <div className='date__current'
            onClick={() => { this.toggleCalendarVisibility(isCalendarVisible, showCalendar, hideCalendar) }}>
            { this.renderCurrentDate() }
          </div>
          <Button type='round' icon='arrow'
            onClick={() => { this.setNextDate(currentDate, setDate) }} />
        </div>
        <Calendar />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateBlock)
