const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const homepageRoutes = require('./routes/homepage')
const graphqlRoutes = require('./routes/graphql')

const app = express()

app.use(cors())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use('/', homepageRoutes)

app.use(bodyParser.json())
app.use('/graphql', graphqlRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, () => console.log('Express app listening on localhost:3000'))

module.exports = app
