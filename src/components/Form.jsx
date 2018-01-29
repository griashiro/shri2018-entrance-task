import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Inputs from './Inputs'
import Button from './Button'

import { hideForm, showDialog, setPageOverflow,
  clearValidatedData, createEvent, updateEvent } from '$redux/actions'

const mapStateToProps = state => ({
  isVisible: state.form.isVisible,
  isEditForm: state.form.isEditForm,
  formData: state.form.formData
})

const mapDispatchToProps = dispatch => ({
  hideForm: bindActionCreators(hideForm, dispatch),
  showDialog: bindActionCreators(showDialog, dispatch),
  setPageOverflow: bindActionCreators(setPageOverflow, dispatch),
  clearValidatedData: bindActionCreators(clearValidatedData, dispatch),
  createEvent: bindActionCreators(createEvent, dispatch),
  updateEvent: bindActionCreators(updateEvent, dispatch)
})

class Form extends Component {
  static propTypes = {
    formData: PropTypes.object,
    isVisible: PropTypes.bool,
    isEditForm: PropTypes.bool,
    hideForm: PropTypes.func,
    showDialog: PropTypes.func,
    setPageOverflow: PropTypes.func,
    clearValidatedData: PropTypes.func,
    createEvent: PropTypes.func,
    updateEvent: PropTypes.func
  }

  showDeleteDialog = () => {
    const { showDialog } = this.props
    showDialog(false)
  }

  getUsersToAdd () {
    const { formData } = this.props
    const originalUsersIds = formData.originalEvent.users.map(user => user.id)
    const newUsersIds = formData.usersIds

    return newUsersIds.filter((userId) => {
      return originalUsersIds.indexOf(userId) < 0
    })
  }

  getUsersToRemove () {
    const { formData } = this.props
    const originalUsersIds = formData.originalEvent.users.map(user => user.id)
    const newUsersIds = formData.usersIds

    return originalUsersIds.filter((userId) => {
      return newUsersIds.indexOf(userId) < 0
    })
  }

  updateEvent () {
    const { formData, updateEvent } = this.props
    updateEvent(formData, this.getUsersToAdd(), this.getUsersToRemove())
  }

  onSaveButtonClick = () => {
    const { hideForm, showDialog, setPageOverflow, clearValidatedData } = this.props
    this.updateEvent()
    showDialog(true, false)
    setPageOverflow('auto')
    clearValidatedData()
    hideForm()
  }

  onCreateButtonClick = () => {
    const { formData, hideForm, showDialog, setPageOverflow,
      clearValidatedData, createEvent } = this.props
    createEvent(formData)
    showDialog(true, true)
    setPageOverflow('auto')
    clearValidatedData()
    hideForm()
  }

  isUsersChanged () {
    const { formData } = this.props
    const originalEvent = formData.originalEvent
    const originalUsers = originalEvent.users.map((user) => user.id)
    const addedUsers = [...formData.usersIds]

    if (originalUsers.length !== addedUsers.length) {
      return true
    }

    originalUsers.sort()
    addedUsers.sort()

    return originalUsers.some((value, index) => {
      return value !== addedUsers[index]
    })
  }

  isEventChanged () {
    const { formData, isEditForm } = this.props

    if (isEditForm) {
      const originalEvent = formData.originalEvent
      const isTitleChanged = formData.title !== originalEvent.title
      const isRoomChanged = formData.roomId !== originalEvent.room.id
      const isTimeStartChanged = (new Date(formData.dateStart)).getTime() !==
        (new Date(originalEvent.dateStart)).getTime()
      const isTimeEndChanged = (new Date(formData.dateEnd)).getTime() !==
        (new Date(originalEvent.dateEnd)).getTime()

      return isTitleChanged || isRoomChanged || isTimeStartChanged || isTimeEndChanged ||
        this.isUsersChanged()
    }

    return true
  }

  isButtonDisabled () {
    const { formData } = this.props
    const isAllDataSet = !!(formData.isDateSet && formData.isStartTimeSet &&
      formData.isEndTimeSet && formData.title && formData.users.length > 0 &&
      formData.roomId)

    return !isAllDataSet || !this.isEventChanged()
  }

  handleClick = () => {
    const { hideForm, setPageOverflow, clearValidatedData } = this.props
    clearValidatedData()
    hideForm()
    setPageOverflow('auto')
  }

  handleAnimationStart = (e) => {
    const target = e && e.target

    if (target && target.className.includes('moveInDown')) {
      target.style.visibility = 'visible'
    }
  }

  handleAnimationEnd = (e) => {
    const target = e && e.target

    if (target && target.className.includes('moveOutDown')) {
      target.style.visibility = 'hidden'
    }
  }

  render () {
    const { isVisible, isEditForm, formData = {} } = this.props

    if (Object.keys(formData).length === 0) {
      return null
    }

    const editClass = (isEditForm ? ' form_edit' : ' form_create')
    const visibleClass = (isVisible ? ' moveInDown' : ' moveOutDown')

    return (
      <div className={'form animated' + editClass + visibleClass}
        onAnimationStart={this.handleAnimationStart}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <div className='form__content'>
          <div className='form__header'>
            <span className='form__title'>
              {isEditForm ? 'Редактирование встречи' : 'Новая встреча'}
            </span>
            <Button onClick={this.handleClick} type='round' icon='cross' />
          </div>
          <Inputs />
        </div>
        <div className='form__footer'>
          <div className='form__footer-content'>
            <div className={'form__create-buttons'}>
              <Button
                onClick={this.handleClick}
                type='rect' text='Отмена'
                isMarginRight />
              <Button
                onClick={this.onCreateButtonClick}
                type='rect' text='Создать встречу'
                isEmphasis
                disabled={this.isButtonDisabled()} />
            </div>
            <div className={'form__edit-buttons'}>
              <Button onClick={this.handleClick}
                type='rect'
                text='Отмена'
                isMarginRight />
              <Button onClick={this.showDeleteDialog}
                type='rect'
                text='Удалить'
                isMarginRight />
              <Button onClick={this.onSaveButtonClick}
                type='rect'
                text='Сохранить'
                disabled={this.isButtonDisabled()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
