import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Room from './Room'
import createTimeString from '../utils/createTimeString'
import getRecommendation from '../utils/getRecommendation'

const mapStateToProps = state => ({
  data: state.api.data,
  formData: state.form.formData
})
const mapDispatchToProps = dispatch => ({})

class InputsRoom extends Component {
  static propTypes = {
    data: PropTypes.object,
    formData: PropTypes.object
  }

  renderSelectedRoom () {
    const { formData } = this.props
    return <Room
      selected
      start={createTimeString(formData.dateStart)}
      end={createTimeString(formData.dateEnd)}
      room={formData.room}
      floor={formData.floor}
      id={formData.roomId}
    />
  }

  renderRecommendations () {
    const { data, formData } = this.props
    const recommendations = getRecommendation(data, formData.users,
      formData.dateStart, formData.dateEnd)

    if (recommendations.length === 0) {
      return <div>
        <div className='inputs__room-no-available'>
          Нет доступных переговорок
        </div>
        <div className='inputs__room-hint'>
          Попробуйте уменьшить число участников, изменить дату или время.
        </div>
      </div>
    }

    return recommendations.map((room, index) => {
      return (
        <Room
          start={createTimeString(formData.dateStart)}
          end={createTimeString(formData.dateEnd)}
          room={room.title}
          floor={room.floor}
          id={room.id}
          key={index}
        />
      )
    })
  }

  isDateAndTimeSet () {
    const { formData } = this.props
    return formData.isDateSet && formData.isStartTimeSet && formData.isEndTimeSet
  }

  render () {
    const { formData } = this.props
    const visibility = this.isDateAndTimeSet() ? 'visible' : 'hidden'
    return (
      <div className='inputs__room' style={{visibility}}>
        <div className='inputs__label'>
          { formData.roomId ? 'Выбранная переговорка' : 'Рекомендуемые переговорки' }
        </div>
        {this.isDateAndTimeSet() ? (
          (formData.roomId ? (this.renderSelectedRoom()) : (this.renderRecommendations()))
        ) : null}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputsRoom)
