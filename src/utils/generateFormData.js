import createDateString from './createDateString'
import createTimeString from './createTimeString'

export default function (data, eventId, timeStart, roomId) {
  let event, users, room, timeEnd

  if (eventId) {
    event = data.eventsById[eventId]

    users = event.users.map(({id: userId}) => {
      const user = data.usersById[userId]
      return {
        id: user.id,
        login: user.login,
        avatarUrl: user.avatarUrl
      }
    })

    room = data.roomsById[event.room.id]
  }

  if (timeStart) {
    timeEnd = new Date(timeStart)
    timeEnd.setHours(timeEnd.getHours(), timeEnd.getMinutes() + 30, 0, 0)
    timeEnd = timeEnd.toString()
  }

  if (!room) {
    room = data && data.roomsById[roomId]
  }

  return {
    eventId: eventId,
    originalEvent: event || {},
    title: (event && event.title) || '',
    usersIds: (event && event.users.map(user => user.id)) || [],
    roomId: (event && event.room.id) || roomId || '',
    dateStart: (event && event.dateStart) || timeStart || '',
    dateEnd: (event && event.dateEnd) || timeEnd || '',
    users: users || [],
    room: (room && room.title) || '',
    floor: (room && room.floor) || '',
    lastSetFullDate: (event && event.dateStart) || timeStart || null,
    date: (event && createDateString(event.dateStart, true)) || (timeStart && createDateString(timeStart, true)) || '',
    dateDefault: (event && createDateString(event.dateStart, true)) || (timeStart && createDateString(timeStart, true)) || '',
    start: (event && createTimeString(event.dateStart)) || (timeStart && createTimeString(timeStart)) || '',
    startDefault: (event && createTimeString(event.dateStart)) || (timeStart && createTimeString(timeStart)) || '',
    end: (event && createTimeString(event.dateEnd)) || (timeEnd && createTimeString(timeEnd, true)) || '',
    endDefault: (event && createTimeString(event.dateEnd)) || (timeEnd && createTimeString(timeEnd, true)) || '',
    isDateSet: event ? true : !!timeStart,
    isStartTimeSet: event ? true : !!timeStart,
    isEndTimeSet: event ? true : !!timeEnd
  }
}
