const Sequelize = require('sequelize')

const createScheme = require('./scheme')

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'db.sqlite3',
  operatorsAliases: false,
  logging: false
})

createScheme(sequelize).sync()

module.exports.sequelize = sequelize
module.exports.models = sequelize.models
