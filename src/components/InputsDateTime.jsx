import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CalenradIcon from './CalendarIcon'

import {
  updateFormData,
  setValidatedDate,
  setValidatedTimeStart,
  setValidatedTimeEnd,
  setFocus
} from '$redux/actions'

import createDateString from '../utils/createDateString'
import validateDate from '../utils/validateDate'
import validateTime from '../utils/validateTime'
import createTimeString from '../utils/createTimeString'

const mapStateToProps = state => ({
  formData: state.form.formData,
  validatedDate: state.validated.date,
  validatedTimeStart: state.validated.timeStart,
  validatedTimeEnd: state.validated.timeEnd
})

const mapDispatchToProps = dispatch => ({
  updateFormData: bindActionCreators(updateFormData, dispatch),
  setValidatedDate: bindActionCreators(setValidatedDate, dispatch),
  setValidatedTimeStart: bindActionCreators(setValidatedTimeStart, dispatch),
  setValidatedTimeEnd: bindActionCreators(setValidatedTimeEnd, dispatch),
  setFocus: bindActionCreators(setFocus, dispatch)
})

class DateTime extends Component {
  static propTypes = {
    formData: PropTypes.object,
    updateFormData: PropTypes.func,
    validatedDate: PropTypes.string,
    validatedTimeStart: PropTypes.string,
    validatedTimeEnd: PropTypes.string,
    setValidatedDate: PropTypes.func,
    setValidatedTimeStart: PropTypes.func,
    setValidatedTimeEnd: PropTypes.func,
    setFocus: PropTypes.func
  }

  handleChangeDate = (e) => {
    const { formData, updateFormData, setValidatedDate, setFocus } = this.props
    const value = validateDate(e.target.value)

    updateFormData({...formData, date: value})

    if (value.length === 8) {
      setValidatedDate(value)
      setFocus('timeStart')

      this.handleBlurDate()
      setTimeout(() => {
        this.startTimeElem.focus()
      }, 0)
    }
  }

  handleFocusDate = (e) => {
    const { formData, updateFormData, setFocus } = this.props
    setFocus('')
    updateFormData({...formData, date: ''})
  }

  handleBlurDate = (e) => {
    const { formData, updateFormData, validatedDate } = this.props
    if (validatedDate) {
      const date = this.dateFromString(validatedDate)

      const dateStart = new Date(formData.dateStart)
      const dateEnd = new Date(formData.dateEnd)

      const isMidnight = !(dateEnd.getHours())

      dateStart.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
      if (isMidnight) {
        dateEnd.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      } else {
        dateEnd.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
      }

      updateFormData({...formData,
        date: createDateString(date, true),
        lastSetFullDate: date.toString(),
        dateStart: dateStart.toString(),
        dateEnd: dateEnd.toString(),
        roomId: '',
        isDateSet: true
      })
    } else {
      updateFormData({...formData, date: formData.dateDefault})
    }
  }

  dateFromString (dateString) {
    const date = dateString.split('.')
    return new Date('20' + date[2], date[1] - 1, date[0])
  }

  updateTimeData = (isStartTime) => {
    const { formData, updateFormData, validatedTimeStart, validatedTimeEnd } = this.props
    const { setValidatedTimeStart, setValidatedTimeEnd } = this.props

    const validatedTime = isStartTime ? validatedTimeStart : validatedTimeEnd
    const setValidatedTime = isStartTime ? setValidatedTimeEnd : setValidatedTimeStart

    if (validatedTime) {
      const date = new Date(formData.lastSetFullDate)
      const time = validatedTime.split(':')
      date.setHours(time[0], time[1], 0, 0)

      const isDatesSet = formData.dateEnd && formData.dateStart
      const anotherDate = new Date(
        (isStartTime ? (formData.dateEnd || null) : (formData.dateStart || null))
      )

      if (anotherDate.getFullYear() === 1970 && !isDatesSet) {
        anotherDate.setHours(1)
      }

      if (!(anotherDate.getHours() + anotherDate.getMinutes())) {
        date.setDate(anotherDate.getDate() - 1)
      } else {
        date.setDate(anotherDate.getDate())
      }

      const isMidnight = !(date.getHours() + date.getMinutes())
      if (!isDatesSet && isMidnight) {
        anotherDate.setHours(23, 30, 0, 0)
      }

      if (isMidnight && (date.getDate() === anotherDate.getDate())) {
        date.setDate(date.getDate() + 1)
      } else if (
        (isStartTime ? date >= anotherDate : (isDatesSet ? date <= anotherDate : date >= anotherDate))
      ) {
        anotherDate.setHours(date.getHours(), date.getMinutes() + (isStartTime ? 30 : -30))
        setValidatedTime(`${createTimeString(anotherDate)}`)
      }

      updateFormData({
        ...formData,
        dateStart: (isStartTime ? date.toString() : anotherDate.toString()),
        dateEnd: (isStartTime ? anotherDate.toString() : date.toString()),
        start: (isStartTime ? validatedTime : `${createTimeString(anotherDate)}`),
        end: (isStartTime ? `${createTimeString(anotherDate)}` : validatedTime),
        roomId: '',
        isStartTimeSet: formData.isStartTimeSet || isStartTime,
        isEndTimeSet: formData.isEndTimeSet || !isStartTime
      })
    } else {
      const key = isStartTime ? 'start' : 'end'
      const value = isStartTime ? formData.startDefault : formData.endDefault
      updateFormData({...formData, [key]: value})
    }
  }

  setTimeData = (isStartTime, e) => {
    const { formData, updateFormData,
      setValidatedTimeStart, setValidatedTimeEnd } = this.props
    const setValidatedTime = isStartTime ? setValidatedTimeStart : setValidatedTimeEnd
    const value = validateTime(e.target.value, !isStartTime)

    const key = isStartTime ? 'start' : 'end'
    updateFormData({...formData, [key]: value})

    if (value.length === 5) {
      setValidatedTime(value)

      const { setFocus } = this.props
      if (isStartTime) {
        setFocus('timeEnd')
        this.handleBlurStartTime()
        setTimeout(() => {
          this.endTimeElem.focus()
        }, 0)
      } else {
        setFocus('search')
        setTimeout(() => {
          this.handleBlurEndTime()
        }, 0)
        e.target.blur()
      }
    }
  }

  handleChangeStartTime = (e) => {
    this.setTimeData(true, e)
  }

  handleFocusStartTime = (e) => {
    const { formData, updateFormData, setFocus } = this.props
    setFocus('')
    updateFormData({...formData, start: ''})
  }

  handleBlurStartTime = (e) => {
    this.updateTimeData(true)
  }

  handleChangeEndTime = (e) => {
    this.setTimeData(false, e)
  }

  handleFocusEndTime = (e) => {
    const { formData, updateFormData, setFocus } = this.props
    setFocus('')
    updateFormData({...formData, end: ''})
  }

  handleBlurEndTime = (e) => {
    this.updateTimeData(false)
  }

  render () {
    const { formData } = this.props

    return (
      <div className='inputs__datetime'>
        <div className='inputs__date'>
          <span className='inputs__calendar-icon'>
            <CalenradIcon />
          </span>
          <label className='inputs__label' htmlFor='date'>Дата</label>
          <input className='inputs__date-input inputs_style' id='date' type='text' name='date'
            maxLength='8'
            onChange={this.handleChangeDate}
            onFocus={this.handleFocusDate}
            onBlur={this.handleBlurDate}
            placeholder='дд.мм.гг'
            value={formData.date} />
        </div>
        <div className='inputs__time'>
          <div className='inputs__time-start'>
            <label className='inputs__label' htmlFor='time-start'>Начало</label>
            <input className='inputs__time-start-input inputs_style'
              ref={elem => { this.startTimeElem = elem }}
              id='time-start'
              type='text'
              name='time-start'
              maxLength='5'
              onChange={this.handleChangeStartTime}
              onFocus={this.handleFocusStartTime}
              onBlur={this.handleBlurStartTime}
              placeholder='чч:мм'
              value={formData.start} />
          </div>
          <div className='inputs__time-delimeter'>—</div>
          <div className='inputs__time-end'>
            <label className='inputs__label' htmlFor='time-end' >Конец</label>
            <input className='inputs__time-end-input inputs_style'
              ref={elem => { this.endTimeElem = elem }}
              id='time-end'
              type='text'
              name='time-start'
              maxLength='5'
              onChange={this.handleChangeEndTime}
              onFocus={this.handleFocusEndTime}
              onBlur={this.handleBlurEndTime}
              placeholder='чч:мм'
              value={formData.end} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateTime)
