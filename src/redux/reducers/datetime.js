import * as types from '../../constants/ActionTypes'

const initialState = {
  currentDate: new Date(),
  currentTime: new Date()
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_DATE: {
      return {
        ...state,
        currentDate: action.date
      }
    }
    case types.UPDATE_TIME: {
      return {
        ...state,
        currentTime: action.currentTime
      }
    }
    default:
      return state
  }
}
