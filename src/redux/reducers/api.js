import * as types from '../../constants/ActionTypes'

const initialState = {
  isFetching: false,
  data: {},
  errors: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_API: {
      return {
        ...state,
        isFetching: true,
        errors: null
      }
    }
    case types.FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    }
    case types.FETCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      }
    }
    default:
      return state
  }
}
