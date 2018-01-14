const user = `
  type User {
    id: ID!
    login: String!
    homeFloor: Int!
    avatarUrl: String!
  }
`

const userInput = `
  input UserInput {
    login: String!
    homeFloor: Int!
    avatarUrl: String!
  }
`

module.exports = [user, userInput]
