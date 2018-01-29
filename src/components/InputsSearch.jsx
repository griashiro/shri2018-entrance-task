import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Cross from './Cross'
import AddedPerson from './AddedPerson'
import FindedPerson from './FindedPerson'

import {
  updateFormData,
  showSearch,
  hideSearch,
  setSearchString,
  updateSearchResult,
  setFocus
} from '$redux/actions'

const mapStateToProps = state => ({
  data: state.api.data,
  formData: state.form.formData,
  focus: state.focus.focus,
  searchString: state.search.searchString,
  searchResult: state.search.searchResult,
  isSearchVisible: state.search.isVisible
})
const mapDispatchToProps = dispatch => ({
  updateFormData: bindActionCreators(updateFormData, dispatch),
  showSearch: bindActionCreators(showSearch, dispatch),
  hideSearch: bindActionCreators(hideSearch, dispatch),
  setSearchString: bindActionCreators(setSearchString, dispatch),
  updateSearchResult: bindActionCreators(updateSearchResult, dispatch),
  setFocus: bindActionCreators(setFocus, dispatch)
})

class Search extends Component {
  static propTypes = {
    data: PropTypes.object,
    formData: PropTypes.object,
    setSearchString: PropTypes.func,
    searchString: PropTypes.string,
    searchResult: PropTypes.array,
    isSearchVisible: PropTypes.bool,
    updateFormData: PropTypes.func,
    showSearch: PropTypes.func,
    hideSearch: PropTypes.func,
    updateSearchResult: PropTypes.func,
    focus: PropTypes.string,
    setFocus: PropTypes.func
  }

  renderUsers () {
    const {formData: {users = []}} = this.props

    return users.map((user, index) => {
      return <AddedPerson login={user.login}
        avatarUrl={user.avatarUrl}
        id={user.id}
        key={index} />
    })
  }

  renderSearchResult () {
    const { searchResult } = this.props
    return searchResult.map((user, index) => {
      const props = {
        id: user.id,
        avatarUrl: user.avatarUrl,
        login: user.login,
        homeFloor: user.homeFloor
      }
      return <FindedPerson {...props} key={index} />
    })
  }

  handleChange = (e) => {
    const { data: {users}, formData: {users: addedUsers = []}, showSearch,
      hideSearch, updateSearchResult, setSearchString } = this.props
    setSearchString(e.target.value)
    const key = e.target.value.toLowerCase()
    const result = users.filter((user) => {
      if (!addedUsers.some((person) => person.id === user.id)) {
        const login = user.login.toLowerCase()
        return login.includes(key)
      }
    })

    if (result.length > 0 && key !== '') {
      updateSearchResult(result)
      showSearch()
    } else {
      hideSearch()
    }
  }

  clearSearchString = () => {
    const { hideSearch, setSearchString, setFocus } = this.props
    hideSearch()
    setSearchString('')
    setFocus('search')
  }

  render () {
    const { isSearchVisible, searchString, focus } = this.props

    if (focus === 'search') {
      if (this.searchElem) {
        this.searchElem.focus()
      }
    }

    const visibleClass = isSearchVisible ? ' flipInX' : ' non-visible'

    return (
      <div className='inputs__search'>
        <span
          onClick={this.clearSearchString}
          className={'inputs__clear-icon' + (searchString.length > 0 ? '' : ' hidden')}>
          <Cross />
        </span>
        <label className='inputs__label' htmlFor='search'>Участники</label>
        <input
          value={searchString}
          onChange={this.handleChange}
          ref={(elem) => { this.searchElem = elem }}
          className='inputs__search-input inputs_style onShowSearch'
          id='search'
          type='text'
          name='search' placeholder='Например, Хан Соло' />
        <div className='inputs__added'>
          {this.renderUsers()}
        </div>
        <div className={'inputs__search-results animated' + visibleClass}>
          {this.renderSearchResult()}
        </div>
        <div className='inputs__delimeter-persons' />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
