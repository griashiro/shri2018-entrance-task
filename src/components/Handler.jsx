import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MeetingRooms from './MeetingRooms'

import {
  updateTime,
  hideCalendar,
  setHoursLlineElemPosition,
  setScroll,
  setHighlightedRoom,
  setSelectedEvent,
  showCreateForm,
  setTimeElemPosition,
  updateFormData,
  setSearchString,
  hideSearch,
  setFocus,
  setPageOverflow
} from '$redux/actions'

import computeOffsetOfTimeElem from '../utils/computeOffsetOfTimeElem'
import generateFormData from '../utils/generateFormData'

const mapStateToProps = state => ({
  currentTime: state.datetime.currentTime,
  isCalendarVisible: state.calendar.isVisible,
  hoursLineElem: state.gui.hoursLineElem,
  overflow: state.gui.overflow,
  formData: state.form.formData
})

const mapDispatchToProps = dispatch => ({
  updateTime: bindActionCreators(updateTime, dispatch),
  hideCalendar: bindActionCreators(hideCalendar, dispatch),
  setHoursLlineElemPosition: bindActionCreators(setHoursLlineElemPosition, dispatch),
  setScroll: bindActionCreators(setScroll, dispatch),
  setHighlightedRoom: bindActionCreators(setHighlightedRoom, dispatch),
  setSelectedEvent: bindActionCreators(setSelectedEvent, dispatch),
  showCreateForm: bindActionCreators(showCreateForm, dispatch),
  setTimeElemPosition: bindActionCreators(setTimeElemPosition, dispatch),
  updateFormData: bindActionCreators(updateFormData, dispatch),
  setSearchString: bindActionCreators(setSearchString, dispatch),
  hideSearch: bindActionCreators(hideSearch, dispatch),
  setFocus: bindActionCreators(setFocus, dispatch),
  setPageOverflow: bindActionCreators(setPageOverflow, dispatch)
})

class Handler extends Component {
  static propTypes = {
    data: PropTypes.object,
    currentTime: PropTypes.object,
    updateTime: PropTypes.func,
    isCalendarVisible: PropTypes.bool,
    hoursLineElem: PropTypes.object,
    hideCalendar: PropTypes.func,
    setHoursLlineElemPosition: PropTypes.func,
    setScroll: PropTypes.func,
    setHighlightedRoom: PropTypes.func,
    setSelectedEvent: PropTypes.func,
    showCreateForm: PropTypes.func,
    setTimeElemPosition: PropTypes.func,
    formData: PropTypes.object,
    updateFormData: PropTypes.func,
    setSearchString: PropTypes.func,
    hideSearch: PropTypes.func,
    setFocus: PropTypes.func,
    overflow: PropTypes.string,
    setPageOverflow: PropTypes.func
  }

  componentDidMount () {
    this.setTimeUpdater()
    this.setListeners()
    this.firstTimeElemUpdate()
  }

  componentWillUnmount () {
    this.removeTimeUpdater()
    this.removeListeners()
  }

  setListeners () {
    if (this.container && !this.isListenerSet) {
      this.isListenerSet = true
      this.setScrollListener()
      this.setResizeListener()
    }
  }

  removeListeners () {
    if (this.container && this.isListenerSet) {
      this.removeScrollListener()
      this.removeResizeListener()
    }
  }

  firstTimeElemUpdate () {
    const timerId = setInterval(() => {
      const { hoursLineElem } = this.props
      if (hoursLineElem) {
        this.updateTimeElemPosition()
        clearInterval(timerId)
      }
    }, 20)
  }

  setTimeUpdater () {
    const updateInterval = 3000
    const { updateTime } = this.props

    updateTime(new Date())
    this.timerId = setInterval(this.updateCurrentTimeIfNeeded, updateInterval)
  }

  removeTimeUpdater () {
    clearInterval(this.timerId)
  }

  setScrollListener () {
    this.container.addEventListener('scroll', (e) => {
      this.snap(e)
    }, true)
  }

  removeScrollListener () {
    this.container.removeEventListener('scroll', this.snap)
  }

  setResizeListener () {
    window.addEventListener('resize', this.updateTimeElemPosition)
  }

  removeResizeListener () {
    window.removeEventListener('resize', this.updateTimeElemPosition)
  }

  updateTimeElemPosition = () => {
    const { currentTime, hoursLineElem, setTimeElemPosition } = this.props
    const startHour = 8
    const hours = currentTime.getHours() - startHour
    const minutes = currentTime.getMinutes()

    if (hours < 0) {
      return
    }

    const currentHoursLineWidth = hoursLineElem.offsetWidth
    setTimeElemPosition(computeOffsetOfTimeElem(hours, minutes, currentHoursLineWidth))
  }

  updateCurrentTimeIfNeeded = () => {
    const oneMinute = 60000
    const { currentTime, updateTime } = this.props

    if (new Date() - currentTime > oneMinute) {
      updateTime(new Date())
      this.updateTimeElemPosition()
    }
  }

  snap = (e) => {
    this.addScrollStyle(e)
    this.scrollHoursLine(e)
  }

  addScrollStyle = (e) => {
    const threshold = 90
    const { setScroll } = this.props
    const target = e && e.target

    if (!target) {
      return
    }

    if (target.scrollLeft > threshold) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  scrollHoursLine = (e) => {
    const { setHoursLlineElemPosition } = this.props
    const target = e && e.target

    if (target) {
      setHoursLlineElemPosition(-target.scrollLeft)
    }
  }

  getActionByClassName = (className) => {
    const { isCalendarVisible } = this.props

    if (isCalendarVisible && !className.includes('calendar') &&
      !className.includes('button')) {
      return this.hideCalendar
    }

    if (className.includes('timelines__half-hour')) {
      if (className.includes('timelines_busy')) {
        return this.selecteEvent
      }
      if (!className.includes('timelines_disabled')) {
        return this.createEvent
      }
    }

    if (className.includes('inputs__finded-person')) {
      return this.addPerson
    }

    if (className.includes('inputs__remove-person-icon')) {
      return this.removePerson
    }

    if (className.includes('inputs__remove-room-icon')) {
      return this.showRecommendations
    }

    if (className.includes('inputs') && className.includes('room') &&
      !className.includes('selected')) {
      return this.selectRoom
    }
  }

  hideCalendar = () => {
    const { hideCalendar } = this.props

    hideCalendar()
  }

  selecteEvent = (target) => {
    const { setSelectedEvent } = this.props

    setSelectedEvent(target.dataset.eventid)
  }

  createEvent = (target) => {
    const { data, showCreateForm, setSelectedEvent, setFocus, setPageOverflow } = this.props

    setPageOverflow('hidden')
    showCreateForm(
      generateFormData(data, null, target.dataset['timestart'], target.dataset['roomid'])
    )
    setFocus('subject')
    setSelectedEvent(null)
  }

  addPerson = (target) => {
    const { data, formData, updateFormData,
      setSearchString, hideSearch, setFocus } = this.props
    const userId = target.dataset['personid'] ||
      target.parentElement.dataset['personid']
    const user = data.usersById[userId]

    updateFormData({
      ...formData,
      usersIds: [...formData.usersIds, userId],
      users: [...formData.users, user]
    })
    setFocus('search')
    setSearchString('')
    hideSearch()
  }

  removePerson = (target) => {
    const { formData, updateFormData } = this.props
    const userId = target.dataset['personid']
    updateFormData({
      ...formData,
      usersIds: [...formData.usersIds.filter((id) => id !== userId)],
      users: [...formData.users.filter((user) => user.id !== userId)]
    })
  }

  selectRoom = (target) => {
    const { data, formData, updateFormData, setFocus } = this.props
    let roomId = target.dataset['roomid'] ||
      target.parentElement.dataset['roomid']
    const room = data.roomsById[roomId]
    setFocus('')
    updateFormData({...formData,
      roomId,
      floor: room &&
      room.floor,
      room: room && room.title})
  }

  showRecommendations = () => {
    const { formData, updateFormData, setFocus } = this.props
    setFocus('')
    updateFormData({...formData, roomId: ''})
  }

  pagetOverflow () {
    const { overflow } = this.props

    document.body.style.overflow = overflow
    document.body.parentNode.style.overflow = overflow
  }

  areaClick = (e) => {
    const { setSelectedEvent } = this.props
    const target = e && e.target

    if (!target) {
      return
    }

    const className = target.className

    if (typeof className !== 'string') {
      return
    }

    const action = this.getActionByClassName(className)
    if (action) {
      action(target)
    } else {
      setSelectedEvent(null)
    }
  }

  hightlighRoom = (e) => {
    const { setHighlightedRoom } = this.props
    const target = e && e.target

    if (!target) {
      return
    }

    const className = target.className

    if (typeof className !== 'string') {
      return
    }

    if (className.includes('timelines__half-hour')) {
      setHighlightedRoom(target.parentElement.dataset['roomid'])
    } else {
      setHighlightedRoom(null)
    }
  }

  render () {
    const handlers = {
      onClick: this.areaClick,
      onMouseOver: this.hightlighRoom
    }
    this.pagetOverflow()
    return <MeetingRooms
      data={this.props.data}
      handlers={handlers}
      containerRef={elem => { this.container = elem }} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Handler)
