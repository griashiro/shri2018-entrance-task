import * as types from '../../constants/ActionTypes'

export const setTimeElemPosition = (positionLeft) => ({
  type: types.SET_TIME_ELEM_POSITION,
  positionLeft
})

export const setScroll = (isScroll) => ({
  type: types.SET_SCROLL,
  isScroll
})

export const setPageOverflow = (overflow) => ({
  type: types.SET_PAGE_OVERFLOW,
  overflow
})

export const setHoursLineElem = (hoursLineElem) => ({
  type: types.SET_HOURSLINE_ELEM,
  hoursLineElem
})

export const setHoursLlineElemPosition = (positionLeft) => ({
  type: types.SET_HOURSLINE_ELEM_POSITION,
  positionLeft
})
