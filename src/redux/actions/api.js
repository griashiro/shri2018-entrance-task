import * as types from '../../constants/ActionTypes'
import * as requests from '../../constants/requests'
import { createApolloFetch } from 'apollo-fetch'

export const fetchApi = () => ({
  type: types.FETCH_API
})

export const fetchSuccess = (data) => ({
  type: types.FETCH_SUCCESS,
  data
})

export const fetchFailure = (errors) => ({
  type: types.FETCH_FAILURE,
  errors
})

export const getData = () => dispatch => {
  dispatch(fetchApi())

  const apolloFetch = createApolloFetch({uri: requests.uri})

  return apolloFetch({query: requests.getQueryForAllData()}).then(result => {
    const {data, errors} = result

    if (errors) {
      dispatch(fetchFailure(errors))
    } else {
      dispatch(fetchSuccess(data))
    }
  }).catch(errors => {
    dispatch(fetchFailure(errors))
  })
}

export const createEvent = (eventData) => dispatch => {
  dispatch(fetchApi())

  const apolloFetch = createApolloFetch({uri: requests.uri})

  return apolloFetch({query: requests.getMutationForCreateEvent(eventData)}).then(result => {
    const { errors } = result

    if (errors) {
      dispatch(fetchFailure(errors))
    } else {
      dispatch(getData())
    }
  }).catch(errors => {
    dispatch(fetchFailure(errors))
  })
}

export const updateEvent = (eventData, addUsers, deleteUsers) => dispatch => {
  dispatch(fetchApi())

  console.log(addUsers, deleteUsers)

  const apolloFetch = createApolloFetch({uri: requests.uri})

  const promises = [
    apolloFetch({query: requests.getMutationUpdateEvent(eventData)}),
    apolloFetch({query: requests.getMutationChangeEventRoom(eventData.eventId, eventData.roomId)})
  ]

  addUsers.forEach((userId) => {
    promises.push(
      apolloFetch({query: requests.getMutationAddUserToEvent(eventData.eventId, userId)})
    )
  })

  deleteUsers.forEach((userId) => {
    promises.push(
      apolloFetch({query: requests.getMutationRemoveEserFromEvent(eventData.eventId, userId)})
    )
  })

  return Promise.all(promises).then((result) => {
    const errors = result.filter((response) => {
      return response.errors
    })

    if (errors.length > 0) {
      dispatch(fetchFailure(errors[0]))
    } else {
      dispatch(getData())
    }
  }).catch(errors => {
    dispatch(fetchFailure(errors))
  })
}

export const removeEvent = (eventId) => dispatch => {
  dispatch(fetchApi())

  const apolloFetch = createApolloFetch({uri: requests.uri})

  return apolloFetch({query: requests.getMutationForDeleteEvent(eventId)}).then(result => {
    const { errors } = result

    if (errors) {
      dispatch(fetchFailure(errors))
    } else {
      dispatch(getData())
    }
  }).catch(errors => {
    dispatch(fetchFailure(errors))
  })
}
