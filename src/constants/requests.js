const uri = 'http://localhost:3000/graphql'

const getQueryForAllData = () => `{
    users {
      id
      avatarUrl
      login
      homeFloor
    }
    rooms {
      id
      title
      capacity
      floor
    }
    events {
      id
      title
      dateStart
      dateEnd
      room {
        id
      }
      users {
        id
      }
    }
  }`

const getMutationForDeleteEvent = (id) => `
  mutation {
    removeEvent(id: ${id}) {
      id
    }
  }`

const getMutationForCreateEvent = (eventData) => `
  mutation {
    createEvent(input: {
        title: "${eventData.title}",
        dateStart: "${(new Date(eventData.dateStart)).toISOString()}",
        dateEnd: "${(new Date(eventData.dateEnd)).toISOString()}"
      },
      usersIds: [${eventData.usersIds}],
      roomId: ${eventData.roomId}
    ) {
      id
    }
  }`

const getMutationUpdateEvent = (eventData) => `
  mutation {
    updateEvent(
      id: ${eventData.eventId}
      input: {
        title: "${eventData.title}",
        dateStart: "${(new Date(eventData.dateStart)).toISOString()}",
        dateEnd: "${(new Date(eventData.dateEnd)).toISOString()}"
      }
    ) {
      id
    }
  }`

const getMutationAddUserToEvent = (eventId, userId) => `
  mutation {
    addUserToEvent(
      id: ${eventId}
      userId: ${userId}
    ) {
      id
    }
  }`

const getMutationRemoveEserFromEvent = (eventId, userId) => `
  mutation {
    removeUserFromEvent(
      id: ${eventId}
      userId: ${userId}
    ) {
      id
    }
  }`

const getMutationChangeEventRoom = (eventId, roomId) => `
  mutation {
    changeEventRoom(
      id: ${eventId}
      roomId: ${roomId}
    ) {
      id
    }
  }`

export { uri, getQueryForAllData,
  getMutationForCreateEvent, getMutationForDeleteEvent, getMutationUpdateEvent,
  getMutationAddUserToEvent, getMutationRemoveEserFromEvent,
  getMutationChangeEventRoom
}
