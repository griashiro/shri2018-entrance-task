import * as types from '../../constants/ActionTypes'

const initialState = {
  date: null,
  timeStart: null,
  timeEnd: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_VALIDATED_DATE: {
      return {
        ...state,
        date: action.date
      }
    }
    case types.SET_VALIDATED_TIME_START: {
      return {
        ...state,
        timeStart: action.timeStart
      }
    }
    case types.SET_VALIDATED_TIME_END: {
      return {
        ...state,
        timeEnd: action.timeEnd
      }
    }
    case types.CLEAR_VALIDATED_DATA: {
      return {
        date: null,
        timeStart: null,
        timeEnd: null
      }
    }
    default:
      return state
  }
}
