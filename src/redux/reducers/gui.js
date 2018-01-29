import * as types from '../../constants/ActionTypes'

const initialState = {
  positionLeftTime: 0,
  positionLeftHoursline: 0,
  hoursLineElem: null,
  isScroll: false,
  overflow: 'auto'
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_TIME_ELEM_POSITION: {
      return {
        ...state,
        positionLeftTime: action.positionLeft
      }
    }
    case types.SET_HOURSLINE_ELEM: {
      return {
        ...state,
        hoursLineElem: action.hoursLineElem
      }
    }
    case types.SET_HOURSLINE_ELEM_POSITION: {
      return {
        ...state,
        positionLeftHoursline: action.positionLeft
      }
    }
    case types.SET_SCROLL: {
      return {
        ...state,
        isScroll: action.isScroll
      }
    }
    case types.SET_PAGE_OVERFLOW: {
      return {
        ...state,
        overflow: action.overflow
      }
    }
    default:
      return state
  }
}
