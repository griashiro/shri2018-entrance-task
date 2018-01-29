import React from 'react'
import PropTypes from 'prop-types'

import Cross from './Cross'

const AddedPerson = ({ avatarUrl, login, id }) => (
  <div className='inputs__person-container animated flipInX'>
    <div className='inputs__added-person'>
      <img className='inputs__added-person-avatar' src={avatarUrl} />
      <div className='inputs__added-person-name'>{login}</div>
      <span className='inputs__remove-person-icon' data-personid={id}>
        <Cross />
      </span>
    </div>
  </div>
)

AddedPerson.prototype.propTypes = {
  avatarUrl: PropTypes.string,
  login: PropTypes.string,
  id: PropTypes.number
}

export default AddedPerson
