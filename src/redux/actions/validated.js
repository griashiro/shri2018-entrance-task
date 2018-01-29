import * as types from '../../constants/ActionTypes'

export const setValidatedDate = (date) => ({
  type: types.SET_VALIDATED_DATE,
  date
})

export const setValidatedTimeStart = (timeStart) => ({
  type: types.SET_VALIDATED_TIME_START,
  timeStart
})

export const setValidatedTimeEnd = (timeEnd) => ({
  type: types.SET_VALIDATED_TIME_END,
  timeEnd
})

export const clearValidatedData = () => ({
  type: types.CLEAR_VALIDATED_DATA
})
