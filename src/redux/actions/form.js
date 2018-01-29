import * as types from '../../constants/ActionTypes'

export const showCreateForm = (formData) => ({
  type: types.SHOW_CREATE_FORM,
  formData
})

export const showEditForm = (formData) => ({
  type: types.SHOW_EDIT_FORM,
  formData
})

export const hideForm = () => ({
  type: types.HIDE_FORM
})

export const updateFormData = (formData) => ({
  type: types.UPDATE_FORM_DATA,
  formData
})
