import * as types from '../../constants/ActionTypes'

export const setHighlightedRoom = (roomId) => ({
  type: types.SET_HIGHLIGHTED_ROOM,
  roomId
})

export const setSelectedEvent = (eventId) => ({
  type: types.SET_SELECTED_EVENT,
  eventId
})
