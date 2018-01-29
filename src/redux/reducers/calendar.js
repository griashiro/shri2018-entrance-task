import * as types from '../../constants/ActionTypes'

const initialState = {
  isVisible: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_CALENDAR: {
      return {
        isVisible: true
      }
    }
    case types.HIDE_CALENDAR: {
      return {
        isVisible: false
      }
    }
    default:
      return state
  }
}
