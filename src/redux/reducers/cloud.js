import * as types from '../../constants/ActionTypes'

const initialState = {
  isVisible: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_CLOUD: {
      return {
        isVisible: true
      }
    }
    case types.HIDE_CLOUD: {
      return {
        isVisible: false
      }
    }
    default:
      return state
  }
}
