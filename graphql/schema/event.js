const event = `
  type Event {
    id: ID!
    title: String!
    dateStart: Date!
    dateEnd: Date!
    users: [User]
    room: Room
  }
`
const eventInput = `
  input EventInput {
    title: String!
    dateStart: Date!
    dateEnd: Date!
  }
`

module.exports = [event, eventInput]
