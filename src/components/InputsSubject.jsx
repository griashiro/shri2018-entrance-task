import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Cross from './Cross'
import { updateFormData } from '../redux/actions'
import { setFocus } from 'redux/actions'

const mapStateToProps = state => ({
  formData: state.form.formData,
  focus: state.focus.focus
})
const mapDispatchToProps = dispatch => ({
  updateFormData: bindActionCreators(updateFormData, dispatch),
  setFocus: bindActionCreators(setFocus, dispatch)
})

class Subject extends Component {
  static propTypes = {
    formData: PropTypes.object,
    updateFormData: PropTypes.func,
    focus: PropTypes.string,
    setFocus: PropTypes.func
  }

  handleChange = (e) => {
    const { formData, updateFormData, setFocus } = this.props
    setFocus('subject')
    updateFormData({...formData, title: e.target.value})
  }

  clearTitleInput = () => {
    const { formData, updateFormData, setFocus } = this.props
    updateFormData({...formData, title: ''})
    setFocus('subject')
  }

  componentDidMount () {
    if (this.props.focus === 'subject') {
      this.subjectElem.focus()
    }
  }

  render () {
    const { formData } = this.props
    const title = formData.title || ''

    if (this.props.focus === 'subject') {
      if (this.subjectElem) {
        this.subjectElem.focus()
      }
    }

    return (
      <div className='inputs__subject' >
        <span className={'inputs__clear-icon' + (title.length > 0 ? '' : ' hidden')}
          onClick={this.clearTitleInput}>
          <Cross />
        </span>
        <label className='inputs__label' htmlFor='subject'>Тема</label>
        <input className='inputs__subject-input inputs_style'
          onChange={this.handleChange}
          ref={(elem) => { this.subjectElem = elem }}
          value={title}
          id='subject'
          type='text'
          name='subject'
          placeholder='О чём будете говорить?' />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subject)
