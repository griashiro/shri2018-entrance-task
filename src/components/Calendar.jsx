import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import monthNames from '../constants/monts'
import isDatesEqual from '../utils/isDatesEqual'

const mapStateToProps = state => ({
  isVisible: state.calendar.isVisible,
  currentDate: state.datetime.currentDate
})

class Calendar extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    currentDate: PropTypes.object
  }

  renderMonths () {
    const { currentDate: date } = this.props

    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1)
    const currMonth = new Date(date.getFullYear(), date.getMonth())
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1)

    const months = [prevMonth, currMonth, nextMonth]

    return months.map((month) => {
      return (
        <div className='calendar__month' key={month.getMonth()}>
          <div className='calendar__month-name'>
            {monthNames[month.getMonth()]}
          </div>
          {this.renderWeeks(month)}
        </div>
      )
    })
  }

  renderWeeks (month) {
    let day = { num: 0, date: 1 }
    const weeks = [0, 1, 2, 3, 4]
    return weeks.map((week) => {
      return (
        <div className='calendar__weeks-list' key={week}>
          <div className='calendar__week'>
            {this.renderDays(month, day)}
          </div>
        </div>
      )
    })
  }

  renderDays (month, day) {
    let days = []
    days = days.concat(this.getEmptyDaysBeginningMonth(month, day))

    do {
      const dateValue = new Date(month.getFullYear(), month.getMonth(), day.date)
      days.push(
        <div
          className={this.generateClassName(month, day)}
          data-date={dateValue}
          key={day.num}>{day.date}
        </div>
      )
      ++day.num
      ++day.date
      if (day.num % 7 === 0) {
        return [...days]
      }
    } while (day.date < this.getLastDateOfMonth(month) + 1)

    return days.concat(this.getEmptyDaysEndMonth(month, day))
  }

  getLastDateOfMonth (month) {
    return (new Date(month.getFullYear(), month.getMonth() + 1, 0)).getDate()
  }

  generateClassName (month, day) {
    let className = 'calendar__day'
    className += (this.isToday(month, day) ? ' calendar_today' : '')
    className += (this.isSelected(month, day) ? ' calendar_selected' : '')
    return className
  }

  isToday (month, day) {
    const now = new Date()
    const dateValue = new Date(month.getFullYear(), month.getMonth(), day.date)

    return isDatesEqual(now, dateValue)
  }

  isSelected (month, day) {
    const { currentDate: date } = this.props
    const dateValue = new Date(month.getFullYear(), month.getMonth(), day.date)
    const selectedDate = new Date(
      date.getFullYear(), date.getMonth(), date.getDate()
    )

    return isDatesEqual(selectedDate, dateValue)
  }

  getEmptyDaysBeginningMonth (month, day) {
    const emptyDays = []
    for (; day.num < month.getDay() - 1; ++day.num) {
      emptyDays.push(<div className='calendar__day' key={day.num} />)
    }
    return emptyDays
  }

  getEmptyDaysEndMonth (month, day) {
    const emptyDays = []
    for (; day.num < 35; ++day.num) {
      emptyDays.push(<div className='calendar__day' key={day.num} />)
    }
    return emptyDays
  }

  handleAnimationStart = (e) => {
    const target = e && e.target

    if (target && target.className.includes('fadeIn')) {
      target.style.visibility = 'visible'
    }

    e.stopPropagation()
  }

  handleAnimationEnd = (e) => {
    const target = e && e.target

    if (target && target.className.includes('fadeOut')) {
      target.style.visibility = 'hidden'
    }

    e.stopPropagation()
  }

  render () {
    const { isVisible } = this.props
    return (
      <div className={'calendar animated' + (isVisible ? ' fadeIn' : ' fadeOut')}
        onAnimationStart={this.handleAnimationStart}
        onAnimationEnd={this.handleAnimationEnd} >
        <div className={'calendar__background animated' + (isVisible ? ' fadeIn' : ' fadeOut')}
          onAnimationStart={this.handleAnimationStart}
          onAnimationEnd={this.handleAnimationEnd} />
        <div className={'calendar__box animated' + (isVisible ? ' moveInLeft' : ' moveOutLeft')}>
          <div className='calendar__content'>
            {this.renderMonths()}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Calendar)
