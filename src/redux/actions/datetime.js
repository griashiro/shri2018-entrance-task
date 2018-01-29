import * as types from '../../constants/ActionTypes'

export const setDate = (date) => ({
  type: types.SET_DATE,
  date
})

export const updateTime = (currentTime) => ({
  type: types.UPDATE_TIME,
  currentTime
})
