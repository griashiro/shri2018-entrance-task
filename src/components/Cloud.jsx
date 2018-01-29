import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from './Button'

import { showEditForm, setFocus, setPageOverflow } from '$redux/actions'
import createDateString from '../utils/createDateString'
import createTimeString from '../utils/createTimeString'
import declOfNum from '../utils/declOfNum'
import generateFormData from '../utils/generateFormData'

const mapStateToProps = state => ({
  data: state.api.data,
  selectedEventId: state.select.selectedEventId,
  isVisible: state.cloud.isVisible
})

const mapDispatchToProps = dispatch => ({
  showEditForm: bindActionCreators(showEditForm, dispatch),
  setFocus: bindActionCreators(setFocus, dispatch),
  setPageOverflow: bindActionCreators(setPageOverflow, dispatch)
})

class Cloud extends Component {
  static propTypes = {
    data: PropTypes.object,
    selectedEventId: PropTypes.string,
    isVisible: PropTypes.bool,
    showEditForm: PropTypes.func,
    setFocus: PropTypes.func,
    setPageOverflow: PropTypes.func
  }

  isButtonDisabled (eventStartTime) {
    return new Date(eventStartTime) < new Date()
  }

  createCloudText (event) {
    const { data } = this.props
    const date = createDateString(event.dateStart)
    const time = `${createTimeString(event.dateStart)} – ${createTimeString(event.dateEnd)}`
    const roomName = data.roomsById[event.room.id].title

    return `${date}, ${time}  ·  ${roomName}`
  }

  createCloudUserInfo (event) {
    const { data } = this.props
    const users = event.users

    const user = data.usersById[users[0].id]
    const firstUserLogin = user.login
    const firstUserAvatarUrl = user.avatarUrl

    const otherUsersCount = users.length - 1
    const otherUsers = ` и ${otherUsersCount}` +
      ` ${declOfNum(otherUsersCount, ['участник', 'участника', 'участников'])}`

    return {
      firstUserLogin,
      firstUserAvatarUrl,
      otherUsers
    }
  }

  onClick = () => {
    const { data, selectedEventId, showEditForm, setFocus, setPageOverflow } = this.props
    setFocus('')
    setPageOverflow('hidden')
    showEditForm(generateFormData(data, selectedEventId))
  }

  handleAnimationStart = (e) => {
    const target = e && e.target

    if (target && target.className.includes('pulse')) {
      target.style.visibility = 'visible'
    }
  }

  handleAnimationEnd = (e) => {
    const target = e && e.target

    if (target && target.className.includes('fadeOut')) {
      target.style.visibility = 'hidden'
    }
  }

  render () {
    const { data, isVisible, selectedEventId } = this.props
    const event = data.eventsById[selectedEventId]

    const title = event.title
    const cloudInfo = this.createCloudUserInfo(event)

    return (
      <div className={'cloud animated' + (isVisible ? ' flipInX' : ' fadeOut')}
        onAnimationStart={this.handleAnimationStart}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <div className='cloud__title'>{title}</div>
        <div className='cloud__text'>{this.createCloudText(event)}</div>
        <div className='cloud__user-content'>
          <img className='cloud__avatar' src={cloudInfo.firstUserAvatarUrl} />
          <div className='cloud__users'>
            <span className='cloud__first-user-name'>{cloudInfo.firstUserLogin}</span>
            <span className='cloud__other-users'>{cloudInfo.otherUsers}</span>
          </div>
        </div>
        <div className={'cloud__button' + (this.isButtonDisabled(event.dateStart) ? ' hidden' : '')}>
          <Button onClick={this.onClick} type='round' icon='pencil' />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cloud)
