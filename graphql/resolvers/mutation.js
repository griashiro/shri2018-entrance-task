const { models } = require('../../models')

module.exports = {
  // User
  createUser (root, { input }) {
    return models.User.create(input)
  },

  updateUser (root, { id, input }) {
    return models.User.findById(id)
      .then(user => {
        return user.update(input)
      })
  },

  removeUser (root, { id }) {
    return models.User.findById(id)
      .then(user => user.destroy())
  },

  // Room
  createRoom (root, { input }) {
    return models.Room.create(input)
  },

  updateRoom (root, { id, input }) {
    return models.Room.findById(id)
      .then(room => {
        return room.update(input)
      })
  },

  removeRoom (root, { id }) {
    return models.Room.findById(id)
      .then(room => room.destroy())
  },

  // Event
  createEvent (root, { input, usersIds, roomId }) {
    return models.Event.create(input)
      .then(event => {
        event.setRoom(roomId)

        return event.setUsers(usersIds)
          .then(() => event)
      })
  },

  updateEvent (root, { id, input }) {
    return models.Event.findById(id)
      .then(event => {
        return event.update(input)
      })
  },

  removeEvent (root, { id }) {
    return models.Event.findById(id)
      .then(event => event.destroy())
  },

  addUserToEvent (root, { id, userId }) {
    return models.Event.findById(id)
      .then(event => {
        return event.addUser(userId)
          .then(() => event)
      })
  },

  removeUserFromEvent (root, { id, userId }) {
    return models.Event.findById(id)
      .then(event => {
        event.removeUser(userId)
        return event
      })
  },

  changeEventRoom (root, { id, roomId }) {
    return models.Event.findById(id)
      .then(event => {
        event.setRoom(roomId)
        return event
      })
  }
}
