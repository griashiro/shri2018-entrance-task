import * as types from '../../constants/ActionTypes'

export const showDialog = (isSuccess, isCreate) => ({
  type: types.SHOW_DIALOG,
  isSuccess,
  isCreate
})

export const hideDialog = () => ({
  type: types.HIDE_DIALOG
})
