import * as types from '../../constants/ActionTypes'

const initialState = {
  focus: null,
  elem: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_FOCUS: {
      return {
        focus: action.focus,
        elem: action.elem
      }
    }
    default:
      return state
  }
}
