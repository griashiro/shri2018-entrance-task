const request = require('supertest')

var app = require('../index')

describe('Express Tests', function () {
  it('get "/" should return 200 OK', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(done)
  })

  it('get "/graphql?query={users{id}}" should return 200 OK and Content-Type: application/json', function (done) {
    request(app)
      .get('/graphql?query={users{id}}')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .end(done)
  })

  it('get "/somepage" should return 404 Not Found', function (done) {
    request(app)
      .get('/somepage')
      .expect(404)
      .end(done)
  })
})
