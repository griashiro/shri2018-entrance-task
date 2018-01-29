import * as types from '../../constants/ActionTypes'

const initialState = {
  isVisible: false,
  isEditForm: false,
  formData: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_CREATE_FORM: {
      console.log('CREATE', action.formData)
      return {
        ...state,
        isVisible: true,
        isEditForm: false,
        formData: action.formData
      }
    }
    case types.SHOW_EDIT_FORM: {
      return {
        ...state,
        isVisible: true,
        isEditForm: true,
        formData: action.formData
      }
    }
    case types.HIDE_FORM: {
      return {
        ...state,
        isVisible: false,
        isEditForm: false
      }
    }
    case types.UPDATE_FORM_DATA: {
      return {
        ...state,
        formData: action.formData
      }
    }
    default:
      return state
  }
}
