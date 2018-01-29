import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EmojiSuccess from './EmojiSuccess'
import EmojiDelete from './EmojiDelete'
import Button from './Button'

import { hideDialog, hideForm, removeEvent, setPageOverflow, clearValidatedData } from '$redux/actions'

const mapStateToProps = state => ({
  isVisible: state.dialog.isVisible,
  isSuccess: state.dialog.isSuccess,
  isCreate: state.dialog.isCreate,
  formData: state.form.formData
})

const mapDispatchToProps = dispatch => ({
  hideDialog: bindActionCreators(hideDialog, dispatch),
  hideForm: bindActionCreators(hideForm, dispatch),
  removeEvent: bindActionCreators(removeEvent, dispatch),
  setPageOverflow: bindActionCreators(setPageOverflow, dispatch),
  clearValidatedData: bindActionCreators(clearValidatedData, dispatch)
})

class Dialog extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isCreate: PropTypes.bool,
    hideDialog: PropTypes.func,
    hideForm: PropTypes.func,
    removeEvent: PropTypes.func,
    formData: PropTypes.object,
    setPageOverflow: PropTypes.func,
    clearValidatedData: PropTypes.func
  }

  onRemoveButtonClick = () => {
    const { formData: {eventId}, removeEvent, hideForm, hideDialog,
      setPageOverflow, clearValidatedData } = this.props
    removeEvent(eventId)
    setPageOverflow('auto')
    clearValidatedData()
    hideForm()
    hideDialog()
  }

  handleAnimationStart = (e) => {
    const target = e && e.target

    if (target && target.className.includes('fadeIn')) {
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
    const { isVisible, isSuccess, isCreate, hideDialog, formData = {} } = this.props

    if (Object.keys(formData).length === 0) {
      return null
    }

    const date = formData.date || ''
    const start = formData.start || ''
    const end = formData.end || ''
    const room = formData.room || ''
    const floor = formData.floor || ''

    const datetime = `${date.split(',')[0]}, ${start} – ${end}`
    const roomAndFloor = `${room}  ·  ${floor} этаж`

    return (
      <div className={'dialog' + (isVisible ? '' : ' non-visible fadeOut')}>
        <div className='dialog__content'>
          <div className={'dialog__success dialog_content-position' + (isSuccess ? '' : ' hidden')}>
            <div className='dialog__emoji-success'>
              <EmojiSuccess />
            </div>
            <div className='dialog__title-success'>
              {`Встреча успешно ${isCreate ? 'создана' : 'сохранена'}!`}
            </div>
            <div className='dialog__datetime'>{datetime}</div>
            <div className='dialog__place'>{roomAndFloor}</div>
            <Button onClick={hideDialog} type='rect' text='Хорошо' isEmphasis />
          </div>
          <div className={'dialog__delete dialog_content-position' + (isSuccess ? ' hidden' : '')}>
            <div className='dialog__emoji-delete'>
              <EmojiDelete />
            </div>
            <div className='dialog__title-delete'>
              Встреча будет<br />удалена безвозвратно
            </div>
            <div className='dialog__buttons-container'>
              <Button onClick={hideDialog} type='rect' text='Отмена' isMarginRight />
              <Button onClick={this.onRemoveButtonClick} type='rect' text='Удалить' />
            </div>
          </div>
        </div>
        <div className={'dialog__background animated' + (isVisible ? ' fadeIn' : ' fadeOut')}
          onAnimationStart={this.handleAnimationStart}
          onAnimationEnd={this.handleAnimationEnd}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog)
