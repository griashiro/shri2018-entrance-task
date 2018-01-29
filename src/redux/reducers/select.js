import * as types from '../../constants/ActionTypes'

const initialState = {
  selectedRoomId: null,
  selectedEventId: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_HIGHLIGHTED_ROOM: {
      return {
        ...state,
        selectedRoomId: action.roomId
      }
    }
    case types.SET_SELECTED_EVENT: {
      return {
        ...state,
        selectedEventId: action.eventId
      }
    }
    default:
      return state
  }
}
