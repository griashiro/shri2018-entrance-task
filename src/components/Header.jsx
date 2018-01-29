import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showCreateForm, setSelectedEvent,
  setFocus, setPageOverflow } from '$redux/actions'

import Logo from './Logo'
import Button from './Button'

import generateFormData from '../utils/generateFormData'

const mapStateToProps = state => ({
  isFormVisible: state.form.isVisible
})

const mapDispatchToProps = dispatch => ({
  showCreateForm: bindActionCreators(showCreateForm, dispatch),
  setSelectedEvent: bindActionCreators(setSelectedEvent, dispatch),
  setFocus: bindActionCreators(setFocus, dispatch),
  setPageOverflow: bindActionCreators(setPageOverflow, dispatch)
})

class Header extends Component {
  static propTypes = {
    isFormVisible: PropTypes.bool,
    showCreateForm: PropTypes.func,
    setSelectedEvent: PropTypes.func,
    setFocus: PropTypes.func,
    setPageOverflow: PropTypes.func
  }

  handleClick = () => {
    const { showCreateForm, setSelectedEvent,
      setFocus, setPageOverflow } = this.props
    setPageOverflow('hidden')
    showCreateForm(generateFormData())
    setSelectedEvent(null)
    setFocus('subject')
  }

  render () {
    const { isFormVisible } = this.props

    return (
      <div className='header'>
        <div className='header__logo'>
          <Logo />
        </div>
        <div className={'header__button' + (isFormVisible ? ' hidden' : '')}>
          <Button
            onClick={this.handleClick}
            text={'Создать встречу'}
            type={'rect'}
            isEmphasis />
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
