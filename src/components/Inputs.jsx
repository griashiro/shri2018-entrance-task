import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InputsSubject from './InputsSubject'
import InputsDateTime from './InputsDateTime'
import InputsSearch from './InputsSearch'
import InputsRoom from './InputsRoom'

import { showDialog } from '$redux/actions'

const mapStateToProps = state => ({
  data: state.api.data
})

const mapDispatchToProps = dispatch => ({
  showDialog: bindActionCreators(showDialog, dispatch)
})

class Inputs extends Component {
  static propTypes = {
    showDialog: PropTypes.func
  }

  showDeleteDialog = () => {
    this.props.showDialog(false)
  }

  render () {
    return (
      <div className='inputs'>
        <div className='inputs__group'>
          <InputsSubject />
          <InputsDateTime />
        </div>
        <div className='inputs__delimeter' />
        <div className='inputs__group'>
          <InputsSearch />
          <InputsRoom />
        </div>
        <div className='inputs__delete-meeting'>
          <div className='inputs__delimeter-remove-top' />
          <div
            onClick={this.showDeleteDialog}
            className='inputs__delete-meeting-button'>
            <span>Удалить встречу</span>
          </div>
          <div className='inputs__delimeter-remove-bottom' />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputs)
