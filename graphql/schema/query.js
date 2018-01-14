const query = `
  type Query {
    user(id: ID!): User
    users: [User]
    event(id: ID!): Event
    events: [Event]
    room(id: ID!): Room
    rooms: [Room]
  }
`

module.exports = query
