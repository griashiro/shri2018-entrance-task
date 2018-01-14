const mutation = `
  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    removeUser(id: ID!): User

    createRoom(input: RoomInput!): Room
    updateRoom(id: ID!, input: RoomInput!): Room
    removeRoom(id: ID!): Room

    createEvent(input: EventInput!, usersIds: [ID], roomId: ID!): Event
    updateEvent(id: ID!, input: EventInput!): Event
    removeEvent(id: ID!): Event
    addUserToEvent(id: ID!, userId: ID!): Event
    removeUserFromEvent(id: ID!, userId: ID!): Event
    changeEventRoom(id: ID!, roomId: ID!): Event
  }
`

module.exports = mutation
