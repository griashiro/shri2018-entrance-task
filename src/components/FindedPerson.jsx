import React from 'react'
import PropTypes from 'prop-types'

const FindedPerson = ({ id, avatarUrl, login, homeFloor }) => (
  <div className='inputs__finded-person' data-personid={id}>
    <img className='inputs__finded-person-avatar' src={avatarUrl} />
    <span className='inputs__finded-person-name'>{login}</span>
    <span className='inputs__finded-person-floor'>
      {`  ·  ${homeFloor} этаж`}
    </span>
  </div>
)

FindedPerson.prototype.propTypes = {
  id: PropTypes.number,
  avatarUrl: PropTypes.string,
  login: PropTypes.string,
  homeFloor: PropTypes.string
}

export default FindedPerson
