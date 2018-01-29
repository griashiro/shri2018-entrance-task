import * as types from '../../constants/ActionTypes'

const initialState = {
  isVisible: false,
  searchResult: [],
  searchString: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SEARCH: {
      return {
        ...state,
        isVisible: true
      }
    }
    case types.HIDE_SEARCH: {
      return {
        ...state,
        isVisible: false
      }
    }
    case types.UPDATE_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: action.searchResult
      }
    }
    case types.SET_SEARCH_STRING: {
      return {
        ...state,
        searchString: action.searchString
      }
    }
    default:
      return state
  }
}
