import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './App.css'

import { getData } from 'redux/actions'

import Spinner from 'components/Spinner'
import Error from 'components/Error'
import Arranger from 'components/Arranger'

const mapStateToProps = state => ({
  data: state.api.data,
  isFetchingApi: state.api.isFetching,
  errors: state.api.errors
})

const mapDispatchToProps = dispatch => ({
  getData: bindActionCreators(getData, dispatch)
})

class App extends Component {
  static propTypes = {
    getData: PropTypes.func,
    isFetchingApi: PropTypes.bool,
    errors: PropTypes.object,
    data: PropTypes.object
  }

  componentWillMount () {
    const { getData } = this.props
    getData()
  }

  render () {
    const { errors, data, isFetchingApi } = this.props

    if (isFetchingApi) {
      return <Spinner />
    }

    if (errors) {
      return <Error errors={errors} />
    }

    return <Arranger data={data} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
