const room = `
  type Room {
    id: ID!
    title: String!
    capacity: Int!
    floor: Int!
  }
`

const roomInput = `
  input RoomInput {
    title: String!
    capacity: Int!
    floor: Int!
  }
`

module.exports = [room, roomInput]
