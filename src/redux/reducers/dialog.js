import * as types from '../../constants/ActionTypes'

const initialState = {
  isVisible: false,
  isSuccess: false,
  isCreate: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_DIALOG: {
      return {
        isVisible: true,
        isSuccess: action.isSuccess,
        isCreate: action.isCreate
      }
    }
    case types.HIDE_DIALOG: {
      return {
        ...state,
        isVisible: false
      }
    }
    default:
      return state
  }
}
