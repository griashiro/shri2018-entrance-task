const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')

const date = require('./date')
const userTypes = require('./user')
const roomTypes = require('./room')
const eventTypes = require('./event')
const query = require('./query')
const mutation = require('./mutation')

const schema = `
  schema {
    query: Query
    mutation: Mutation
  }
`

module.exports = makeExecutableSchema({
  typeDefs: [
    date,
    ...userTypes,
    ...roomTypes,
    ...eventTypes,
    query,
    mutation,
    schema
  ],
  resolvers: resolvers()
})
